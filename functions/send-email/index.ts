
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createTransport } from "npm:nodemailer@6.9.11";
import { multiParser } from "https://deno.land/x/multiparser@0.1.18/mod.ts";

// Helper to safely read env variables / secrets
function getEnvVar(key) {
  const value = Deno.env.get(key) || "";
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

serve(async (req) => {
  console.log("Request received:", req.method, req.url);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  
  // Only allow POST requests
  if (req.method !== "POST") {
    console.error(`Invalid method: ${req.method}`);
    return new Response(JSON.stringify({
      error: "Method not allowed"
    }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  let formData;
  let attachment = null;
  const contentType = req.headers.get("content-type") || "";
  console.log("Content-Type:", contentType);

  try {
    if (contentType.includes("multipart/form-data")) {
      console.log("Parsing multipart form data");
      // Parse multipart form data
      const form = await multiParser(req);
      
      // Extract form fields
      formData = {
        name: form.fields.name || "",
        email: form.fields.email || "",
        phone: form.fields.phone || "",
        message: form.fields.message || ""
      };
      
      // Extract file attachment if present
      if (form.files && form.files.attachment) {
        const file = form.files.attachment;
        console.log("File attached:", file.filename);
        
        // Read file content
        attachment = {
          filename: file.filename,
          content: file.content,
          contentType: file.contentType
        };
      }
      
      console.log("Parsed form data:", formData);
    } else if (contentType.includes("application/json")) {
      console.log("Parsing JSON data");
      formData = await req.json();
    } else {
      console.error("Unsupported content type:", contentType);
      return new Response(JSON.stringify({
        error: "Unsupported content type"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  } catch (err) {
    console.error("Error parsing request data:", err);
    return new Response(JSON.stringify({
      error: `Failed to parse request data: ${err.message}`
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  const { name, email, phone, message } = formData || {};
  if (!name || !email || !message) {
    console.error("Missing required fields:", {
      name,
      email,
      message
    });
    return new Response(JSON.stringify({
      error: "Name, email, and message fields are required."
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  try {
    // Read secrets from environment (these should be configured in Supabase project secrets)
    const smtpHost = getEnvVar("SMTP_HOST");
    const smtpPort = parseInt(getEnvVar("SMTP_PORT"), 10); // e.g. 587
    const smtpUser = getEnvVar("SMTP_USER");
    const smtpPass = getEnvVar("SMTP_PASS");
    const recipient1 = "patrickodonohue@yahoo.com"; // Where to send received messages
    const recipient2 = "jpgatt06@gmail.com";
    
    console.log(`SMTP config: ${smtpHost}:${smtpPort}`);
    
    // Set up nodemailer transport for Zoho
    const transporter = createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });
    
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      to: [
        recipient1,
        recipient2
      ],
      subject: `Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Message: ${message}
      `,
      html: `
        <h2>Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "Not provided"}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
      replyTo: email,
      attachments: attachment ? [
        {
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType
        }
      ] : []
    };
    
    console.log("Sending email to:", recipient1, " and ", recipient2);
    if (attachment) {
      console.log("With attachment:", attachment.filename);
    }
    
    await transporter.sendMail(mailOptions);
    
    return new Response(JSON.stringify({
      success: true
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      status: 200
    });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(JSON.stringify({
      error: `Failed to send email: ${err.message}`
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      status: 500
    });
  }
});
