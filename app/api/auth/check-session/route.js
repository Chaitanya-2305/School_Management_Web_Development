// // app/api/auth/check-session/route.js
// import { cookies } from 'next/headers';

// export async function GET() {
//   const cookieStore = cookies();
//   // Await the cookies() function and then get the cookie
//   const otpVerifiedCookie = await cookieStore.get('otp_verified');

//   if (otpVerifiedCookie && otpVerifiedCookie.value === 'true') {
//     return new Response(JSON.stringify({ authenticated: true }), { status: 200 });
//   } else {
//     return new Response(JSON.stringify({ authenticated: false }), { status: 401 });
//   }
// }