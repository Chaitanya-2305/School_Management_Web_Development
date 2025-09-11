import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendOtpEmail(to, otp) {
  await sgMail.send({
    to,
    from: process.env.FROM_EMAIL,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });
}
