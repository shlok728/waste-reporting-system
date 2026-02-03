import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login.jsx"
import Register  from "./pages/Register.jsx"
import Dashboard from "./pages/dashboard.jsx"
import ProtectedRoute from "./components/protectedroute.jsx"
import Report from "./pages/Report.jsx"
import Admin from "./pages/admin.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>}/>
      <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>}/>
      <Route path="/admin"element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>}/>


      


      


    </Routes>
  )
}

export default App
