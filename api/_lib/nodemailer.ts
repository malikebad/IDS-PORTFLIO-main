import nodemailer from "nodemailer";

// In-memory simple rate limiting for serverless execution
const ipRequestHistory = new Map<string, number[]>();

export const isRateLimited = (ip: string, maxRequests = 5, windowMs = 60000): boolean => {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  ipRequestHistory.set(ip, validTimestamps);
  return false;
};

// Input sanitization
export const sanitize = (input: string | undefined): string => {
  if (!input) return "";
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim();
};

// Create Nodemailer Transporter
export const getTransporter = () => {
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

// Branded Admin Notification Template
export const getAdminNotificationHtml = (params: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  const safeName = sanitize(params.name);
  const safeEmail = sanitize(params.email);
  const safePhone = sanitize(params.phone);
  const safeSubject = sanitize(params.subject);
  const safeMessage = sanitize(params.message);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>New Inquiry</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }
        .wrapper { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #18181b, #27272a); padding: 32px 28px; border-bottom: 2px solid #a3e635; }
        .badge { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #a3e635; background: rgba(163, 230, 53, 0.1); border: 1px solid rgba(163, 230, 53, 0.2); padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
        .title { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; }
        .content { padding: 28px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #a1a1aa; margin-bottom: 4px; }
        .value { font-size: 15px; color: #f4f4f5; line-height: 1.5; }
        .value a { color: #a3e635; text-decoration: none; }
        .message-box { background: #09090b; border: 1px solid #27272a; border-radius: 10px; padding: 18px; margin-top: 6px; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; }
        .footer { padding: 20px 28px; background: #09090b; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; text-align: center; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <span class="badge">Inquiry Notification</span>
          <h1 class="title">New Website Inquiry Received</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Sender Name</div>
            <div class="value"><strong>${safeName}</strong></div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
          </div>
          ${safePhone ? `
          <div class="field">
            <div class="label">Phone Number</div>
            <div class="value"><a href="tel:${safePhone}">${safePhone}</a></div>
          </div>` : ""}
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${safeSubject || "General Consultation"}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">${safeMessage}</div>
          </div>
        </div>
        <div class="footer">
          Received via <a href="https://inventordesignstudio.io" style="color:#a3e635;">Inventor Design Studio</a> &bull; ${new Date().toUTCString()}
        </div>
      </div>
    </body>
    </html>
  `;
};

// Branded Confirmation Template for the Visitor
export const getClientConfirmationHtml = (name: string, subject?: string) => {
  const safeName = sanitize(name);
  const safeSubject = sanitize(subject);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Thank You &bull; Inventor Design Studio</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }
        .wrapper { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: #18181b; padding: 32px 28px; text-align: center; border-bottom: 1px solid #27272a; }
        .logo-text { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; }
        .logo-accent { color: #a3e635; }
        .content { padding: 32px 28px; font-size: 15px; line-height: 1.6; color: #d4d4d8; }
        .greeting { font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 16px; }
        .highlight-box { background: #09090b; border: 1px solid #27272a; border-left: 3px solid #a3e635; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; }
        .footer { padding: 24px; background: #09090b; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; text-align: center; }
        .footer a { color: #a3e635; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="logo-text">INVENTOR <span class="logo-accent">DESIGN STUDIO</span></div>
        </div>
        <div class="content">
          <div class="greeting">Hi ${safeName},</div>
          <p>Thank you for reaching out to Inventor Design Studio. We have received your inquiry regarding <strong>"${safeSubject || "your project"}"</strong>.</p>
          <div class="highlight-box">
            Our creative directors and engineering leads are reviewing your message and will respond within <strong>24 business hours</strong>.
          </div>
          <p>In the meantime, feel free to explore our featured work and interactive case studies on our website.</p>
          <p style="margin-top: 28px;">Best regards,<br><strong style="color: #ffffff;">Inventor Design Studio Team</strong></p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Inventor Design Studio. All rights reserved.<br>
          <a href="https://inventordesignstudio.io">https://inventordesignstudio.io</a> &bull; <a href="mailto:info@inventerdesignstudio.com">info@inventerdesignstudio.com</a>
        </div>
      </div>
    </body>
    </html>
  `;
};
