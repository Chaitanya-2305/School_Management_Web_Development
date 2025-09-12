const otpStore = {};

export function saveOtp(email, otp) {
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // expires in 5 min
}

export function verifyOtp(email, otp) {
  const entry = otpStore[email];
  if (!entry) return false;
  const valid = entry.otp === otp && Date.now() < entry.expires;
  if (valid) delete otpStore[email];
  return valid;
}
