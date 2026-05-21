require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;
const LEAD_RECIPIENT = "gobright.growth@gmail.com";
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || "http://localhost:5173,http://localhost:4173,https://gobright.in")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: CLIENT_ORIGINS }));
app.use(express.json({ limit: "20kb" }));

function clean(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeLead(body) {
  const name = clean(body.name || body.customerName);
  const company = clean(body.company || body.companyName);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone || body.mobile);
  const service = clean(body.service || body.formName || "Website Enquiry");
  const location = clean(body.location);
  const rawMessage = clean(body.message || body.requirements);

  const messageParts = [];
  if (company) messageParts.push(`Company: ${company}`);
  if (location) messageParts.push(`Location: ${location}`);
  if (rawMessage) messageParts.push(rawMessage);

  return {
    name,
    company,
    email,
    phone,
    service,
    location,
    rawMessage,
    message: messageParts.join("\n\n") || "No message provided.",
  };
}

function validateLead(lead) {
  const errors = [];

  if (!lead.name || lead.name.length < 2) errors.push("Name must be at least 2 characters.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push("Please enter a valid email address.");
  if (!/^[+]?[\d\s\-()]{7,15}$/.test(lead.phone)) errors.push("Please enter a valid phone number.");
  if (!lead.service) errors.push("Please select a service.");
  if (!lead.rawMessage || lead.rawMessage.length < 10) errors.push("Message must be at least 10 characters.");

  return errors;
}

function buildEmailHTML(lead) {
  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Service", lead.service],
    ["Company", lead.company],
    ["Location", lead.location],
    ["Message", lead.message],
    ["Received", `${now} IST`],
  ].filter(([, value]) => clean(value));

  const rowHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #2a2a2a;color:#777;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:32%;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="margin:0;padding:32px;background:#0d0d0d;font-family:Arial,sans-serif;color:#fff;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#111;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:28px 24px;background:#e32028;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:26px;">New Website Enquiry</h1>
            <p style="margin:8px 0 0;color:#ffe5e5;font-size:14px;">GoBright lead form submission</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a2a;border-radius:10px;overflow:hidden;">
              ${rowHtml}
            </table>
            <p style="margin:20px 0 0;color:#777;font-size:12px;text-align:center;">
              This email was sent automatically from gobright.in.
            </p>
          </td>
        </tr>
      </table>
    </div>
  `.trim();
}

function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER and EMAIL_PASS are required.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

app.post("/api/contact", async (req, res) => {
  const lead = normalizeLead(req.body);
  const errors = validateLead(lead);

  if (errors.length) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    const transporter = createTransporter();
    const to = clean(process.env.EMAIL_TO) || LEAD_RECIPIENT;
    const info = await transporter.sendMail({
      from: `"GoBright Website" <${process.env.EMAIL_USER}>`,
      to,
      replyTo: lead.email,
      subject: `New Lead: ${lead.name} - ${lead.service}`,
      html: buildEmailHTML(lead),
      text: `
New Lead from GoBright Website
Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone}
Service: ${lead.service}
Company: ${lead.company || "-"}
Location: ${lead.location || "-"}
Message:
${lead.message}
      `.trim(),
    });

    const accepted = (info.accepted || []).map((address) => address.toLowerCase());
    const expectedRecipient = LEAD_RECIPIENT.toLowerCase();

    if (!accepted.includes(expectedRecipient)) {
      console.error("Email was not accepted by the required recipient:", {
        expected: LEAD_RECIPIENT,
        accepted: info.accepted,
        rejected: info.rejected,
      });
      return res.status(502).json({
        success: false,
        error: `Email was not accepted by ${LEAD_RECIPIENT}. Please try again.`,
      });
    }

    console.log(`Email sent to ${LEAD_RECIPIENT}: ${info.messageId}`);
    return res.json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Email send failed:", error.message);
    return res.status(500).json({
      success: false,
      error: "Email send failed. Please check the mail server settings and try again.",
    });
  }
});

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`GoBright server running on http://localhost:${PORT}`);
});
