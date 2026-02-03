import { useEffect, useState } from "react"
import api from "../services/api"
import "../styles/dashboard.css"

export default function AdminDashboard() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/reports", {
          headers: { Authorization: token }
        })
        setReports(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchAllReports()
  }, [])

  return (
    <div className="dashboard-page">
      <h2>Admin Panel</h2>

      <div className="report-list">
        {reports.map(r => (
          <div key={r._id} className="report-card">
            {r.image && <img src={r.image} alt="waste" />}
            <p>{r.description}</p>
            <span>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
