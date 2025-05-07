
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createTransport } from "npm:nodemailer@6.9.11";

// Helper to safely read env variables / secrets
function getEnvVar(key) {
  const value = Deno.env.get(key) || "";
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

// Simple multipart form-data parser since the external dependency is causing issues
async function parseMultipartFormData(request) {
  const contentType = request.headers.get("content-type") || "";
  const boundary = contentType.match(/boundary=([^;]+)/)?.[1];
  
  if (!boundary) {
    throw new Error("No boundary found in multipart form-data");
  }
  
  const data = await request.arrayBuffer();
  const decoder = new TextDecoder();
  const text = decoder.decode(data);
  const parts = text.split(`--${boundary}`);
  
  const formData = {};
  let attachment = null;
  
  for (const part of parts) {
    if (!part.trim() || part.includes('--\r\n')) continue;
    
    const [headersText, ...bodyParts] = part.split('\r\n\r\n');
    const bodyContent = bodyParts.join('\r\n\r\n');
    
    // Parse headers
    const headerMatch = headersText.match(/name="([^"]+)"/);
    const fieldName = headerMatch ? headerMatch[1] : null;
    
    if (!fieldName) continue;
    
    // Check if this part contains a file
    const filenameMatch = headersText.match(/filename="([^"]+)"/);
    const contentTypeMatch = headersText.match(/Content-Type: ([^\r\n]+)/);
    
    if (filenameMatch && contentTypeMatch && fieldName === 'attachment') {
      // For binary files like images, we need to properly encode the data
      const binaryContent = bodyContent.trim();
      
      attachment = {
        filename: filenameMatch[1],
        content: Buffer.from(binaryContent, 'binary'),
        contentType: contentTypeMatch[1],
        encoding: 'base64'
      };
      
      console.log(`Attachment detected: ${filenameMatch[1]} (${contentTypeMatch[1]})`);
    } else if (fieldName) {
      // Regular form field
      formData[fieldName] = bodyContent.trim();
    }
  }
  
  return { fields: formData, attachment };
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
      // Parse multipart form data using our custom parser
      const parsedData = await parseMultipartFormData(req);
      
      // Extract form fields
      formData = {
        name: parsedData.fields.name || "",
        email: parsedData.fields.email || "",
        phone: parsedData.fields.phone || "",
        message: parsedData.fields.message || ""
      };
      
      // Extract file attachment if present
      if (parsedData.attachment) {
        attachment = parsedData.attachment;
        console.log("File attached:", attachment.filename, "with content type:", attachment.contentType);
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
    
    let attachmentConfig = [];
    
    if (attachment) {
      console.log(`Processing attachment: ${attachment.filename} (${attachment.contentType})`);
      attachmentConfig = [{
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
        encoding: attachment.encoding
      }];
    }
    
    const mailOptions = {
      from: `"${formData.name}" <${smtpUser}>`,
      to: [
        recipient1,
        recipient2
      ],
      subject: `Contact Form Submission from ${formData.name}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone || "Not provided"}
        Message: ${formData.message}
      `,
      html: `
        <h2>Contact Form Submission</h2>
        <p><b>Name:</b> ${formData.name}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Phone:</b> ${formData.phone || "Not provided"}</p>
        <p><b>Message:</b></p>
        <p>${formData.message}</p>
      `,
      replyTo: formData.email,
      attachments: attachmentConfig
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
