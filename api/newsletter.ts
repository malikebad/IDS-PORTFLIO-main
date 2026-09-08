import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getTransporter, sanitize, isRateLimited } from "./_lib/nodemailer.js";

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
    const senderEmail = process.env.SMTP_USER || "info@inventordesignstudio.io";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || "info@inventordesignstudio.io";

    // 1. Send notification to admin via SMTP
    await transporter.sendMail({
      from: `"Inventor Newsletter" <${senderEmail}>`,
      to: receiverEmail,
      subject: `[New Newsletter Subscriber] ${cleanEmail}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; background: #09090b; color: #f4f4f5; border-radius: 12px; max-width: 500px; border: 1px solid #27272a;">
          <h3 style="color: #a3e635; margin-top: 0;">New Newsletter Subscriber</h3>
          <p style="color: #a1a1aa; font-size: 14px;">A new user has subscribed to studio updates and insights:</p>
          <div style="background: #18181b; padding: 12px 16px; border-radius: 8px; border: 1px solid #27272a; font-weight: 600; color: #ffffff; margin: 16px 0;">
            ${cleanEmail}
          </div>
          <p style="color: #71717a; font-size: 12px; margin-bottom: 0;">Received on ${new Date().toUTCString()}</p>
        </div>
      `,
    });

    // 2. Send welcome email to the subscriber via SMTP
    try {
      await transporter.sendMail({
        from: `"Inventor Design Studio" <${senderEmail}>`,
        to: cleanEmail,
        subject: `Welcome to Inventor Design Studio Insights`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; background: #0D0D0D; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #27272a;">
            <div style="background: linear-gradient(135deg, #18181b 0%, #09090b 100%); padding: 32px 28px; border-bottom: 1px solid #27272a; text-align: center;">
              <h2 style="color: #a3e635; margin: 0 0 8px 0; font-size: 22px; font-weight: 700;">Welcome to Inventor Design Studio</h2>
              <p style="color: #a1a1aa; font-size: 14px; margin: 0;">Engineering &bull; AI Agents &bull; Video Production</p>
            </div>
            <div style="padding: 28px;">
              <p style="font-size: 15px; line-height: 1.6; color: #e4e4e7;">
                Thank you for subscribing! You're now on the insider list for our latest project breakdowns, Agentic AI architectures, video production showcases, and studio insights.
              </p>
              <div style="background: #18181b; padding: 16px; border-radius: 10px; border: 1px solid #27272a; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #a3e635; font-weight: 600;">What to expect:</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #a1a1aa; line-height: 1.8;">
                  <li>Cutting-edge full-stack & AI agent case studies</li>
                  <li>Cinematic 4K color grading & motion design breakdowns</li>
                  <li>Exclusive design systems & performance insights</li>
                </ul>
              </div>
              <p style="font-size: 13px; color: #71717a; line-height: 1.5; margin-top: 24px;">
                Have an upcoming project? Reply directly to this email or visit <a href="https://inventordesignstudio.io" style="color: #a3e635; text-decoration: none;">inventordesignstudio.io</a>.
              </p>
            </div>
            <div style="background: #09090b; padding: 16px 28px; border-top: 1px solid #27272a; text-align: center; font-size: 12px; color: #52525b;">
              &copy; ${new Date().getFullYear()} Inventor Design Studio &bull; info@inventordesignstudio.io
            </div>
          </div>
        `,
      });
    } catch (subscriberErr) {
      console.warn("Subscriber welcome email note:", subscriberErr);
    }

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
