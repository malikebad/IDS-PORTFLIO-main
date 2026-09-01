import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getTransporter,
  getAdminNotificationHtml,
  getClientConfirmationHtml,
  isRateLimited,
  sanitize,
} from "./_lib/nodemailer.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle preflight CORS
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Only POST is accepted.",
    });
  }

  // Rate Limiting per IP
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(clientIp, 6, 60000)) {
    return res.status(429).json({
      success: false,
      error: "Too many requests. Please wait a minute before submitting again.",
    });
  }

  try {
    const { name, email, phone, subject, message, _hp_company, website } = req.body || {};

    // Anti-spam honeypot detection: bots automatically populate hidden fields
    if (_hp_company || website) {
      console.warn("Spam honeypot triggered by IP:", clientIp);
      // Quietly return success to fool bots without sending email
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const transporter = getTransporter();
    const senderEmail = process.env.SMTP_USER || "ebadm7251@gmail.com";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || "ebadm7251@gmail.com";

    // 1. Send Admin Notification Email
    await transporter.sendMail({
      from: `"Inventor Design Studio Inquiry" <${senderEmail}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `[New Inquiry] ${sanitize(subject) || "Website Consultation"} - ${sanitize(name)}`,
      html: getAdminNotificationHtml({ name, email, phone, subject, message }),
    });

    // 2. Send Confirmation Email to Client
    try {
      await transporter.sendMail({
        from: `"Inventor Design Studio" <${senderEmail}>`,
        to: email,
        subject: `Thank you for contacting Inventor Design Studio, ${sanitize(name)}!`,
        html: getClientConfirmationHtml(name, subject),
      });
    } catch (clientErr: any) {
      console.warn("Client confirmation delivery note:", clientErr?.message);
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Contact API Serverless Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send message. Please reach out to info@inventerdesignstudio.com directly.",
    });
  }
}
