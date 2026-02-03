import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Register.css"
import api from "../services/api.js"
import { useNavigate } from "react-router-dom"


export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await api.post("/auth/register", { name, email, password })
    navigate("/login")
  } catch (err) {
    alert(err.response?.data?.msg || "Registration failed")
  }
}

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create Account</h2>
        <p>Join and help keep cities clean</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button type="submit">Register</button>
        </form>

        <div className="login-footer">
          Already have an account? <Link to="/login"><b>Login</b></Link>
        </div>
      </div>
    </div>
  )
}
