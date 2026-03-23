import { getAppUrl } from "../app-url";

type SendResult = {
  delivered: boolean;
  previewUrl?: string;
};

async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;

  if (!resendApiKey || !emailFrom) {
    console.info("auth.email.preview", { to, subject, html });
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom,
        to,
        subject,
        html,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("auth.email.send_failed", { to, subject, error });
    return false;
  }
}

export async function sendVerificationEmail(email: string, token: string): Promise<SendResult> {
  const verificationUrl = `${getAppUrl()}/verify-email?token=${encodeURIComponent(token)}`;
  const delivered = await sendEmail(
    email,
    "Verify your MyShop account",
    `<p>Verify your account to sign in.</p><p><a href="${verificationUrl}">Verify email</a></p>`
  );
  return { delivered, previewUrl: delivered ? undefined : verificationUrl };
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<SendResult> {
  const resetUrl = `${getAppUrl()}/reset-password?token=${encodeURIComponent(token)}`;
  const delivered = await sendEmail(
    email,
    "Reset your MyShop password",
    `<p>Use the link below to reset your password.</p><p><a href="${resetUrl}">Reset password</a></p>`
  );
  return { delivered, previewUrl: delivered ? undefined : resetUrl };
}
