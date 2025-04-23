
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createTransport } from "npm:nodemailer@6.9.11";

// Helper to safely read env variables / secrets
function getEnvVar(key: string): string {
  const value = Deno.env.get(key) || "";
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let formData;
  try {
    formData = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, phone, message } = formData || {};
  if (!name || !email || !phone || !message) {
    return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
  }

  // Read secrets from environment (these should be configured in Supabase project secrets)
  const smtpHost = getEnvVar("SMTP_HOST");
  const smtpPort = parseInt(getEnvVar("SMTP_PORT"), 10); // e.g. 587 
  const smtpUser = getEnvVar("SMTP_USER");
  const smtpPass = getEnvVar("SMTP_PASS");
  const recipient = getEnvVar("CONTACT_RECIPIENT"); // Where to send received messages

  // Set up nodemailer transport for Zoho
  const transporter = createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `"${name}" <${smtpUser}>`,
    to: recipient,
    subject: `Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
    html: `
      <h2>Contact Form Submission</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
    `,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
