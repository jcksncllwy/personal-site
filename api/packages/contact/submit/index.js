const DESTINATION = "hello@jacksoncallaway.com";
const FROM = "Website Contact <contact@jacksoncallaway.com>";
const MAX_MESSAGE_LENGTH = 5000;

function response(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body,
  };
}

exports.main = async function main(args) {
  const name = String(args.name || "").trim();
  const email = String(args.email || "").trim();
  const message = String(args.message || "").trim();
  const honeypot = String(args.website || "").trim();

  // Bots fill every field; humans never see this one. Report success so
  // the bot moves on.
  if (honeypot) {
    return response(200, { ok: true });
  }

  if (!name || !email || !message) {
    return response(400, { ok: false, error: "All fields are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return response(400, { ok: false, error: "Please enter a valid email address." });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return response(400, { ok: false, error: "Message is too long." });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [DESTINATION],
      reply_to: email,
      subject: `Website contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error", res.status, detail);
    return response(502, {
      ok: false,
      error: "Something went wrong sending your message. Please email hello@jacksoncallaway.com directly.",
    });
  }

  return response(200, { ok: true });
};
