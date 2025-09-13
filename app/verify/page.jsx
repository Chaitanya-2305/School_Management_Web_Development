// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function VerifyOtpPage() {
//   const [email, setEmail] = useState("");      // will auto-fill from localStorage
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   // 🔑 1. Pre-fill email from localStorage if it was saved when requesting OTP
//   useEffect(() => {
//     const storedEmail = localStorage.getItem("otp_email");
//     if (storedEmail) setEmail(storedEmail);
//   }, []);

//   // 🔑 2. Verify OTP
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     if (!email || !otp) {
//       setMessage("Email and OTP are required");
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ✅ set a short-lived cookie to mark verification
//         document.cookie =
//           "otp_verified=true; path=/; max-age=3600; SameSite=Lax";

//         setMessage(data.message || "OTP verified successfully!");

//         // wait a moment to ensure cookie is available, then go to AddSchool
//         setTimeout(() => router.push("/addSchool"), 150);
//       } else {
//         setMessage(data.error || "Invalid or expired OTP");
//       }
//     } catch (err) {
//       console.error("Verify error:", err);
//       setMessage("Server error. Try again later.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto" }}>
//       <h2>Verify OTP</h2>
//       <form
//         onSubmit={handleVerify}
//         style={{ display: "flex", flexDirection: "column", gap: "10px" }}
//       >
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />
//         <button type="submit">Verify OTP</button>
//       </form>
//       {message && (
//         <p
//           style={{
//             marginTop: 10,
//             color: message.includes("success") ? "green" : "red",
//           }}
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // ✅ use NextAuth signIn

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Pre-fill email from localStorage if it was saved earlier
  useEffect(() => {
    const storedEmail = localStorage.getItem("otp_email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      setMessage("Email and OTP are required");
      return;
    }

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("OTP verified successfully! Logging you in…");

        // ✅ Create NextAuth session immediately after OTP verification
        //    Your CredentialsProvider should accept { email } and return a user object.
        await signIn("credentials", {
          email,
          redirect: false, // avoid double navigation
        });

        // Redirect to AddSchool page once session is created
        router.push("/addSchool");
      } else {
        setMessage(data.error || "Invalid or expired OTP");
      }
    } catch (err) {
      console.error("Verify error:", err);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Verify OTP</h2>
      <form
        onSubmit={handleVerify}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {message && (
        <p
          style={{
            marginTop: 10,
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
