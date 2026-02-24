'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email')
  const [loading, setLoading] = useState(false)

  const sendOTP = async () => {
    setLoading(true)
    await supabase.auth.signInWithOtp({ email })
    setStep('otp')
    setLoading(false)
  }

  const verifyOTP = async () => {
    setLoading(true)
    await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    })
    alert('Login Successful')
    setLoading(false)
  }

  return (
    <div style={{
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background:'linear-gradient(135deg,#6a11cb,#2575fc)'
    }}>
      <div style={{
        background:'#fff',
        padding:40,
        borderRadius:12,
        width:320,
        boxShadow:'0px 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{marginBottom:20}}>Project Management Login</h2>

        {step === 'email' && (
          <>
            <input
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:15}}
            />
            <button onClick={sendOTP} style={{
              width:'100%',
              padding:10,
              background:'#2575fc',
              color:'#fff',
              border:'none',
              borderRadius:6
            }}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:15}}
            />
            <button onClick={verifyOTP} style={{
              width:'100%',
              padding:10,
              background:'#6a11cb',
              color:'#fff',
              border:'none',
              borderRadius:6
            }}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}