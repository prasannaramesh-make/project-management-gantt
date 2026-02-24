'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {

  const [email,setEmail] = useState('')
  const [otp,setOtp] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [step,setStep] = useState('email')
  const [loading,setLoading] = useState(false)

  // SEND OTP
  const sendOTP = async ()=>{
    setLoading(true)
    await supabase.auth.signInWithOtp({ email })
    setStep('otp')
    setLoading(false)
  }

  // VERIFY OTP
  const verifyOTP = async ()=>{
    setLoading(true)

    const { data } = await supabase.auth.verifyOtp({
      email,
      token:otp,
      type:'email'
    })

    if(data.session){
      setStep('setup')
    }

    setLoading(false)
  }

  // SET USERNAME + PASSWORD
  const setupAccount = async ()=>{

    if(password !== confirmPassword){
      alert('Passwords do not match')
      return
    }

    const { data:{ user } } = await supabase.auth.getUser()

    // save username into profile table
    await supabase.from('profiles').insert({
      id:user?.id,
      username:username
    })

    // update password
    await supabase.auth.updateUser({
      password:password
    })

    alert('Account setup completed. Please login again.')

    await supabase.auth.signOut()

    setStep('email')
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
        width:340,
        boxShadow:'0px 10px 30px rgba(0,0,0,0.2)'
      }}>

        <h2 style={{marginBottom:20}}>Project Management Login</h2>

        {step === 'email' && (
          <>
            <input placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:15}}
            />

            <button onClick={sendOTP} style={{
              width:'100%',padding:10,
              background:'#2575fc',color:'#fff',
              border:'none',borderRadius:6
            }}>
              {loading?'Sending...':'Send OTP'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <input placeholder="Enter OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:15}}
            />

            <button onClick={verifyOTP} style={{
              width:'100%',padding:10,
              background:'#6a11cb',color:'#fff',
              border:'none',borderRadius:6
            }}>
              {loading?'Verifying...':'Verify OTP'}
            </button>
          </>
        )}

        {step === 'setup' && (
          <>
            <input placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:10}}
            />

            <input type="password" placeholder="New Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:10}}
            />

            <input type="password" placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              style={{width:'100%',padding:10,marginBottom:15}}
            />

            <button onClick={setupAccount} style={{
              width:'100%',padding:10,
              background:'#2575fc',color:'#fff',
              border:'none',borderRadius:6
            }}>
              Complete Setup
            </button>
          </>
        )}

      </div>
    </div>
  )
}