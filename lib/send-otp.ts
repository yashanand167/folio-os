type OtpType =
  | "sign-in"
  | "email-verification"
  | "forget-password"
  | "change-email";

function subjectFor(type: OtpType) {
  if (type === "forget-password") return "Reset your Folio OS password";
  if (type === "email-verification") return "Verify your Folio OS email";
  if (type === "change-email") return "Confirm your new Folio OS email";

  return "Your Folio OS sign-in code";
}

export async function sendOtpEmail({
  email,
  otp,
  type,
}: {
  email: string;
  otp: string;
  type: OtpType;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[otp:${type}] ${email} → ${otp}`);
    return;
  }

  const from =
    process.env.EMAIL_FROM ?? "Folio OS <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: subjectFor(type),
      text: `Your code is ${otp}. It expires in 5 minutes.`,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    // console.error("Resend error:", result);
    throw new Error(result.message || "Failed to send OTP email");
  }

  // console.log("Email sent:", result);
}