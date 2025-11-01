# Contact Form Email Setup Guide

## 📧 **EmailJS Setup Instructions**

### **Step 1: Create EmailJS Account**
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### **Step 2: Set Up Email Service**
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred provider)
4. Connect your Gmail account (allow less secure apps or use App Passwords)
5. **Important**: Use `info@inventerdesignstudio.com` as the sender email

### **Step 3: Create Email Template**
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**HTML Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #4ade80;">New Contact Form Message</h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
            <p><strong>Subject:</strong> {{subject}}</p>
        </div>

        <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">{{message}}</p>
        </div>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">

        <p style="color: #6c757d; font-size: 14px;">
            This message was sent from the Inventer Studio website contact form.
        </p>
    </div>
</body>
</html>
```

### **Step 4: Get Your API Keys**
1. Go to **Account** > **General**
2. Copy your **Public Key**
3. Go to **Email Services** and copy your **Service ID**
4. Go to **Email Templates** and copy your **Template ID**

### **Step 5: Update Contact Form Code**

Replace the placeholder values in `src/pages/Contact.tsx`:

```javascript
const serviceId = 'your_actual_service_id'; // Replace with your EmailJS service ID
const templateId = 'your_actual_template_id'; // Replace with your EmailJS template ID
const publicKey = 'your_actual_public_key'; // Replace with your EmailJS public key
```

## 🔧 **Alternative: Formspree Setup (Simpler)**

If EmailJS is too complex, you can use Formspree:

1. Go to [https://formspree.io/](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Copy the form endpoint URL
5. Replace the fetch URL in the contact form code

## 📧 **Email Forwarding Setup**

Since your email is hosted on HostingIner webmail, ensure:

1. **Email Forwarding**: Set up forwarding if needed
2. **SPF Records**: Configure SPF for your domain
3. **DKIM**: Set up DKIM for better deliverability
4. **DMARC**: Configure DMARC policy

## 🧪 **Testing the Contact Form**

1. **Deploy** the website to production
2. **Test** the contact form by submitting a message
3. **Check** your `info@inventerdesignstudio.com` inbox
4. **Verify** that emails are being delivered properly

## 📞 **Support**

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **Formspree Documentation**: https://help.formspree.io/
- **HostingIner Support**: Contact your hosting provider for email setup assistance

## ⚠️ **Important Notes**

- **Free Tier Limits**: EmailJS free tier allows 200 emails/month
- **Security**: Never expose private API keys in client-side code for production
- **Spam Protection**: Consider adding reCAPTCHA for production use
- **Backup**: Have a fallback contact method (phone/email links)

---

**Once set up, all contact form submissions will be automatically emailed to `info@inventerdesignstudio.com`**