// verify/page.jsx
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Set client-side cookie to indicate OTP verification
        // Ensure the cookie is set with appropriate attributes
        document.cookie = `otp_verified=true; path=/; max-age=3600; SameSite=Lax`; // You can adjust max-age as needed

        setMessage(data.message || "OTP verified successfully!");

        // Use router.push or router.replace after setting the cookie
        // It's generally better to use router.push for navigation after a successful action
        router.push("/addSchool");

      } else {
        setMessage(data.error || "Invalid or expired OTP");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
      console.error(err);
    }
  };

  // ... rest of your component
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
      {message && <p style={{ marginTop: "10px", color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}
    </div>
  );
}