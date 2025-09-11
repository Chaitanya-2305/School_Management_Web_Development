'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const requestOtp = async () => {
    await fetch("/api/auth/request-otp", { method: "POST", body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' }});
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ email, otp }), headers: { 'Content-Type': 'application/json' }});
    const json = await res.json();
    if (res.ok) router.push("/addSchool");
    else alert(json.error);
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      {step === 1 ? (
        <>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <button onClick={requestOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}
