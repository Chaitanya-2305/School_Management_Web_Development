'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const verify = async () => {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    if (res.ok) router.push('/addSchool');
    else alert('Invalid or expired OTP');
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit OTP" />
      <button onClick={verify}>Verify</button>
    </div>
  );
}
