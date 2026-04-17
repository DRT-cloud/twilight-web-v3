// POST /api/subscribe — Brevo (formerly Sendinblue) contact ingestion endpoint.
//
// Runs on Cloudflare Pages Functions (Workers runtime).
//
// Required environment variables (set in Cloudflare dashboard
// → Pages project → Settings → Environment Variables):
//   BREVO_API_KEY  — secret. Generate at Brevo → SMTP & API → API Keys.
//   BREVO_LIST_ID  — integer. Found at Brevo → Contacts → Lists.
//
// Optional:
//   BREVO_DOI_TEMPLATE_ID   — integer. If set, uses Brevo's
//                             createDoiContact endpoint (double opt-in).
//   BREVO_DOI_REDIRECT_URL  — string. Confirmation redirect URL.
//
// Honeypot: if the request body includes a non-empty `website` field, we
// silently 200 — bot likely.

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BREVO_DOI_TEMPLATE_ID?: string;
  BREVO_DOI_REDIRECT_URL?: string;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // ────────────────── parse + validate ──────────────────
  let payload: Record<string, unknown>;
  try {
    const ct = request.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      payload = (await request.json()) as Record<string, unknown>;
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch {
    return json(400, { ok: false, error: "Invalid request body" });
  }

  // Honeypot — silent success on bot fills
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json(200, { ok: true });
  }

  const email = String(payload.email ?? "").trim().toLowerCase();
  const firstName = String(payload.firstName ?? "").trim();
  const lastName = String(payload.lastName ?? "").trim();

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return json(400, { ok: false, error: "Please enter a valid email." });
  }

  // ────────────────── env check ──────────────────
  if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
    console.error("Brevo env vars missing");
    return json(500, { ok: false, error: "Subscription is not configured." });
  }

  const listId = parseInt(env.BREVO_LIST_ID, 10);
  if (Number.isNaN(listId)) {
    return json(500, { ok: false, error: "Subscription is misconfigured." });
  }

  // Build Brevo contact payload. Attributes use Brevo's default schema.
  const attributes: Record<string, string> = {};
  if (firstName) attributes.FIRSTNAME = firstName;
  if (lastName) attributes.LASTNAME = lastName;

  // ────────────────── pick endpoint: DOI vs direct ──────────────────
  const useDoi =
    typeof env.BREVO_DOI_TEMPLATE_ID === "string" &&
    env.BREVO_DOI_TEMPLATE_ID !== "";

  const url = useDoi
    ? "https://api.brevo.com/v3/contacts/doubleOptinConfirmation"
    : "https://api.brevo.com/v3/contacts";

  const body = useDoi
    ? {
        email,
        attributes,
        includeListIds: [listId],
        templateId: parseInt(env.BREVO_DOI_TEMPLATE_ID!, 10),
        redirectionUrl:
          env.BREVO_DOI_REDIRECT_URL ?? "https://twilightbiathlon.com/?subscribed=1",
      }
    : {
        email,
        attributes,
        listIds: [listId],
        updateEnabled: true, // upsert: re-add to list if existing
      };

  // ────────────────── call Brevo ──────────────────
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("Brevo network error", err);
    return json(502, { ok: false, error: "Couldn’t reach our email service. Try again." });
  }

  // Brevo returns 201 on create, 204 on update, 400 with code on dupes.
  if (res.ok || res.status === 204) {
    return json(200, { ok: true, doi: useDoi });
  }

  // Surface Brevo's error code so we can give a friendly message
  let errBody: { code?: string; message?: string } = {};
  try {
    errBody = (await res.json()) as typeof errBody;
  } catch {
    /* ignore */
  }

  if (errBody.code === "duplicate_parameter") {
    // Already on the list — treat as success from user's perspective
    return json(200, { ok: true, alreadySubscribed: true });
  }

  console.error("Brevo error", res.status, errBody);
  return json(res.status >= 500 ? 502 : 400, {
    ok: false,
    error: errBody.message ?? "Subscription failed. Try again later.",
  });
};

// Block all non-POST methods explicitly
export const onRequest: PagesFunction = ({ request }) => {
  return new Response(`Method ${request.method} not allowed`, {
    status: 405,
    headers: { allow: "POST" },
  });
};
