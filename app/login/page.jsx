// 'use client';

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const router = useRouter();

//   const requestOtp = async () => {
//     const res = await fetch("/api/auth/request-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });
//     const json = await res.json();
//     if (res.ok) setStep(2);
//     else alert(json.error || "Failed to send OTP");
//   };

//   const verifyOtp = async () => {
//     const res = await fetch("/api/auth/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, otp }),
//     });
//     const json = await res.json();

//     // ✅ Redirect to /addSchool after success
//     if (res.ok) {
//       router.push("/addSchool");
//     } else {
//       alert(json.error || "Invalid OTP");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50 overflow-hidden">
//       <div className="max-w-sm w-full p-6 bg-white shadow-md rounded-md flex flex-col gap-4">
//         {step === 1 ? (
//           <>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="border p-2 rounded w-full"
//             />
//             <button
//               onClick={requestOtp}
//               className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
//             >
//               Send OTP
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               className="border p-2 rounded w-full"
//             />
//             <button
//               onClick={verifyOtp}
//               className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
//             >
//               Verify OTP
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const requestOtp = async () => {
    const res = await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();
    if (res.ok) setStep(2);
    else alert(json.error || "Failed to send OTP");
  };

  const verifyOtpHandler = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const json = await res.json();
    if (res.ok && json.redirect) {
      router.push(json.redirect); // ✅ Redirect to /addSchool
    } else {
      alert(json.error || "Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-sm w-full p-6 bg-white shadow-md rounded-md flex flex-col gap-4">
        {step === 1 ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={requestOtp}
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 rounded w-full"
            />
            <button
              onClick={verifyOtpHandler}
              className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
