import { useState } from "react"
import "../styles/login.css"
import { Link } from "react-router-dom"
import api from "../services/api"
import { useNavigate } from "react-router-dom"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await api.post("/auth/login", { email, password })
    localStorage.setItem("token", res.data.token)
    navigate("/dashboard")
  } catch (err) {
    console.error(err)
    alert("Invalid credentials")
  }
}


  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">

            Don’t have an account? <Link to="/Register"><b>Register</b></Link>

        </div>
      </div>
    </div>
  )
}
