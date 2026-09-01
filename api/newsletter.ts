import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getTransporter, sanitize, isRateLimited } from "./_lib/nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(clientIp, 6, 60000)) {
    return res.status(429).json({
      success: false,
      error: "Too many subscription attempts. Please wait a minute.",
    });
  }

  try {
    const { email, _hp_company, website } = req.body || {};

    // Anti-spam honeypot
    if (_hp_company || website) {
      return res.status(200).json({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email address is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = String(email).trim().toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address.",
      });
    }

    const transporter = getTransporter();
    const senderEmail = process.env.SMTP_USER || "ebadm7251@gmail.com";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || "ebadm7251@gmail.com";

    // Send notification to admin
    await transporter.sendMail({
      from: `"Inventor Newsletter" <${senderEmail}>`,
      to: receiverEmail,
      subject: `[New Newsletter Subscriber] ${cleanEmail}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; background: #09090b; color: #f4f4f5; border-radius: 12px; max-width: 500px; border: 1px solid #27272a;">
          <h3 style="color: #a3e635; margin-top: 0;">New Newsletter Subscriber</h3>
          <p style="color: #a1a1aa; font-size: 14px;">A new user has subscribed to studio updates:</p>
          <div style="background: #18181b; padding: 12px 16px; border-radius: 8px; border: 1px solid #27272a; font-weight: 600; color: #ffffff; margin: 16px 0;">
            ${cleanEmail}
          </div>
          <p style="color: #71717a; font-size: 12px; margin-bottom: 0;">Received on ${new Date().toUTCString()}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    });
  } catch (error: any) {
    console.error("Newsletter API Serverless Error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to subscribe. Please try again later.",
    });
  }
}
