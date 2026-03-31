export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, email } = req.body || {};

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Feedback message is required" });
  }

  // Log to Vercel function logs (retrievable in Vercel dashboard)
  console.log(
    JSON.stringify({
      type: "beta-feedback",
      email: email || "anonymous",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    })
  );

  return res.status(200).json({ success: true });
}
