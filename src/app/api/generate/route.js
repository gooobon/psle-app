export const maxDuration = 60; // Vercel Pro: 60s timeout

export async function POST(request) {
  try {
    const body = await request.json();
    // STEP10_GUARD: this route only serves the app's own generator; block arbitrary payloads
    const ALLOWED_MODELS = ["claude-sonnet-4-6"];
    if (!body || !ALLOWED_MODELS.includes(body.model)) return Response.json({ error: { message: "model not allowed" } }, { status: 400 });
    if (typeof body.max_tokens !== "number" || body.max_tokens > 8000) body.max_tokens = 4000;
    if (!Array.isArray(body.messages) || body.messages.length > 4) return Response.json({ error: { message: "bad request" } }, { status: 400 });
    const secret = process.env.GENERATE_ROUTE_TOKEN;
    if (secret && request.headers.get("x-genius-token") !== secret) return Response.json({ error: { message: "unauthorised" } }, { status: 401 });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({ error: { message: "ANTHROPIC_API_KEY not set" } }, { status: 500 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });

  } catch (error) {
    return Response.json({ error: { message: error.message } }, { status: 500 });
  }
}
