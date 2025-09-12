// test-email.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey("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");

async function sendTestEmail() {
  const msg = {
    to: "syamannaluru@gmail.com",
    from: "syamannaluru@gmail.com", // must be verified
    subject: "Test OTP Email",
    text: "Hello! This is a test email from SendGrid.",
    html: "<p>Hello! This is a test email from SendGrid.</p>",
  };

  try {
    await sgMail.send(msg);
    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.response ? error.response.body : error);
  }
}

sendTestEmail();
