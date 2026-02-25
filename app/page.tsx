const handleSignup = async () => {
  setLoading(true)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    alert(error.message)
    setLoading(false)
    return
  }

  alert("Signup successful. Please check your email to confirm your account.")
  setLoading(false)
}
