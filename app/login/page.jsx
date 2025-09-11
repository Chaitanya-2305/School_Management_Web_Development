'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const sendOtp = async () => {
    await fetch('/api/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setSent(true);
  };

  return (
    <div>
      {!sent ? (
        <>
          <h2>Login with Email</h2>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <p>OTP sent to {email}. Go to <a href="/verify">Verify</a>.</p>
      )}
    </div>
  );
}
