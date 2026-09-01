import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter
const createTransporter = () => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : "";

  return nodemailer.createTransport({
    service: "gmail",
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === "true" || true,
    auth: {
      user: user,
      pass: pass,
    },
  });
};

const transporter = createTransporter();

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.warn("⚠️ SMTP Transporter configuration warning:", error.message);
  } else {
    console.log("✅ Nodemailer SMTP Server is ready to send emails!");
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy", timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message, _hp_company, website } = req.body;

    if (_hp_company || website) {
      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    }

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required fields.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || "ebadm7251@gmail.com";
    const senderEmail = process.env.SMTP_USER || "ebadm7251@gmail.com";

    // 1. Email to Studio / Admin
    const adminMailOptions = {
      from: `"INVENTER Design Studio Form" <${senderEmail}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `[New Inquiry] ${subject || "Website Contact Form"} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
            .card { background-color: #1e293b; border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #334155; }
            .header { border-bottom: 2px solid #a3e635; padding-bottom: 16px; margin-bottom: 24px; }
            .title { color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; }
            .subtitle { color: #94a3b8; font-size: 14px; margin-top: 4px; }
            .field { margin-bottom: 16px; }
            .label { font-size: 12px; text-transform: uppercase; color: #a3e635; font-weight: 600; letter-spacing: 0.5px; }
            .value { font-size: 16px; color: #f1f5f9; margin-top: 4px; line-height: 1.5; }
            .message-box { background-color: #0f172a; border-radius: 8px; padding: 16px; border: 1px solid #334155; margin-top: 8px; white-space: pre-wrap; }
            .footer { margin-top: 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #334155; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1 class="title">New Website Inquiry</h1>
              <p class="subtitle">Received via INVENTER Design Studio Contact Form</p>
            </div>

            <div class="field">
              <div class="label">Client Name</div>
              <div class="value">${name}</div>
            </div>

            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></div>
            </div>

            ${phone ? `
            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value">${phone}</div>
            </div>` : ""}

            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject || "General Inquiry"}</div>
            </div>

            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>

            <div class="footer">
              Sent at ${new Date().toLocaleString()} &bull; INVENTER Design Studio
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 2. Automated Confirmation Email to Client
    const clientMailOptions = {
      from: `"INVENTER Design Studio" <${senderEmail}>`,
      to: email,
      subject: `Thank you for contacting INVENTER Design Studio, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 20px; }
            .card { background-color: #18181b; border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #27272a; }
            .header { text-align: center; border-bottom: 1px solid #27272a; padding-bottom: 20px; margin-bottom: 24px; }
            .title { color: #a3e635; font-size: 22px; font-weight: bold; margin: 0; }
            .greeting { font-size: 16px; color: #f4f4f5; margin-bottom: 16px; }
            .content { font-size: 14px; color: #a1a1aa; line-height: 1.6; }
            .summary { background-color: #09090b; border-radius: 8px; padding: 16px; border: 1px solid #27272a; margin: 20px 0; }
            .footer { font-size: 12px; color: #71717a; text-align: center; margin-top: 30px; border-top: 1px solid #27272a; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1 class="title">INVENTER Design Studio</h1>
            </div>
            <p class="greeting">Hi ${name},</p>
            <p class="content">
              Thank you for reaching out to us. We have received your inquiry regarding <strong>"${subject || "your project"}"</strong> and our team is already reviewing the details.
            </p>
            <p class="content">
              We typically respond within 24 hours on business days.
            </p>
            <div class="summary">
              <p style="margin: 0 0 8px 0; font-weight: bold; color: #f4f4f5;">Summary of your message:</p>
              <p style="margin: 0; font-size: 13px; color: #d4d4d8; font-style: italic;">"${message.length > 200 ? message.substring(0, 200) + '...' : message}"</p>
            </div>
            <p class="content">
              In the meantime, feel free to explore our latest case studies and work on our website.
            </p>
            <div class="footer">
              &copy; ${new Date().getFullYear()} INVENTER Design Studio &bull; Lahore, Pakistan<br>
              <a href="mailto:info@inventerdesignstudio.com" style="color: #a3e635; text-decoration: none;">info@inventerdesignstudio.com</a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send admin notification
    await transporter.sendMail(adminMailOptions);

    // Send confirmation to client (gracefully catch if client email fails)
    try {
      await transporter.sendMail(clientMailOptions);
    } catch (clientErr) {
      console.warn("Client confirmation email note:", clientErr.message);
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send email. Please try again or contact us directly via email.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Newsletter subscription endpoint
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email, _hp_company, website } = req.body;

    if (_hp_company || website) {
      return res.status(200).json({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || "ebadm7251@gmail.com";
    const senderEmail = process.env.SMTP_USER || "ebadm7251@gmail.com";

    // Notify admin
    await transporter.sendMail({
      from: `"INVENTER Newsletter" <${senderEmail}>`,
      to: receiverEmail,
      subject: `[New Newsletter Subscriber] ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: #fff; border-radius: 8px;">
          <h2 style="color: #a3e635;">New Newsletter Subscription</h2>
          <p>A new user has subscribed to the INVENTER Design Studio newsletter:</p>
          <p style="font-size: 18px; font-weight: bold; color: #38bdf8;">${email}</p>
          <p style="color: #94a3b8; font-size: 12px;">Subscribed on ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to subscribe. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Nodemailer Backend server running on http://localhost:${PORT}`);
});
