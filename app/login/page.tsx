'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email')

  const sendOTP = async () => {
    await supabase.auth.signInWithOtp({
      email: email,
    })
    setStep('otp')
  }

  const verifyOTP = async () => {
    await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'email',
    })
    alert('Login Successful')
  }

  return (
    <div style={{padding:40}}>
      <h2>Project Management Login</h2>

      {step === 'email' && (
        <>
          <input
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </>
      )}

      {step === 'otp' && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  )
}