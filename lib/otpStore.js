// // lib/otpStore.js

// // Use a Map to store OTPs in-memory
// export const store = new Map();

// // Function to save OTP
// export function saveOtp(email, otp) {
//   store.set(email, otp);
// }

// // Function to verify OTP
// export function verifyOtp(email, otp) {
//   return store.get(email) === otp;
// }



// const otpStore = {};

// export function saveOtp(email, otp) {
//   otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // expires in 5 min
// }

// export function verifyOtp(email, otp) {
//   const entry = otpStore[email];
//   if (!entry) return false;
//   const valid = entry.otp === otp && Date.now() < entry.expires;
//   if (valid) delete otpStore[email];
//   return valid;
// }



const otpStore = {};

export function saveOtp(email, otp) {
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };
}

export function verifyOtp(email, otp) {
  const entry = otpStore[email];
  if (!entry) return false;
  const valid = entry.otp === otp && Date.now() < entry.expires;
  if (valid) delete otpStore[email]; // delete after successful verification
  return valid;
}

// Export removeOtp so route.js can use it
export function removeOtp(email) {
  delete otpStore[email];
}
