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

  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-MailerLite-ApiKey": apiKey,
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return res
        .status(response.status)
        .json({ error: data.error?.message || "Failed to subscribe" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to connect to email service" });
  }
}
