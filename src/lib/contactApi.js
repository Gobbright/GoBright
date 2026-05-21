const API_URL = import.meta.env.VITE_CONTACT_API_URL || "http://localhost:5000/api/contact";

export const initialLeadForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  service: "",
  location: "",
  message: "",
};

export function validateLead(
  form,
  {
    requireCompany = false,
    requireService = true,
    requireLocation = false,
    requireMessage = false,
  } = {}
) {
  const errors = {};
  const company = form.company?.trim() || "";
  const name = form.name?.trim() || "";
  const email = form.email?.trim() || "";
  const phone = form.phone?.trim() || "";
  const location = form.location?.trim() || "";
  const message = form.message?.trim() || "";

  if (requireCompany && company.length < 2) errors.company = "Company name must be at least 2 characters.";
  if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!/^[+]?[\d\s\-()]{7,15}$/.test(phone)) errors.phone = "Enter a valid phone number.";
  if (requireService && !form.service) errors.service = "Please select a service.";
  if (requireLocation && location.length < 2) errors.location = "Location must be at least 2 characters.";
  if (requireMessage && message.length < 10) errors.message = "Message must be at least 10 characters.";

  return errors;
}

export function getSubmitLabel(status, idleLabel = "Send Message") {
  if (status === "sending") return "Sending...";
  if (status === "success") return "Completed";
  if (status === "error") return "Try Again";
  return idleLabel;
}

export async function sendContactLead(form) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    const message = data.error || data.errors?.join(" ") || "Email send failed. Please try again.";
    throw new Error(message);
  }

  return data;
}
