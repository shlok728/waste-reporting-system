import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"
import "../styles/dashboard.css"



function getUserRole() {
  const token = localStorage.getItem("token")
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.role
  } catch {
    return null
  }
}

export default function Dashboard() {
  const [reports, setReports] = useState([])
  const role = getUserRole()




  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await api.get("/reports/my", {
          headers: { Authorization: token }
        })

        console.log("REPORTS:", res.data) // for debugging
        setReports(res.data)
      } catch (err) {
        console.log("FETCH ERROR:", err)
      }
    }

    fetchReports()
  }, [])
  const markAsCleaned = async (id) => {
  try {
    const token = localStorage.getItem("token")

    const res = await api.put(
      `/reports/${id}/clean`,
      {},
      {
        headers: { Authorization: token }
      }
    )

    setReports((prev) =>
      prev.map((r) => (r._id === id ? res.data : r))
    )
  } catch (err) {
    console.log("ADMIN ACTION ERROR:", err)
    alert("Only admins can do this")
  }
}
const deleteReport = async (id) => {
  if (!window.confirm("Delete this report?")) return

  try {
    const token = localStorage.getItem("token")

    await api.delete(`/reports/${id}`, {
      headers: { Authorization: token }
    })

    setReports(prev => prev.filter(r => r._id !== id))

  } catch (err) {
    alert("Failed to delete report")
    console.log(err)
  }
}





  return (
  <div className="dashboard-page">
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h2>My Reports</h2>
        

  <div className="dashboard-actions">
    <Link to="/report">
      <button className="add-btn">+ New Report</button>
    </Link>
    {role === "admin" && (
      <Link to="/admin">
        <button className="admin-btn">📊 Admin Stats</button>
      </Link>
    )}

    {role === "admin" && (
      <Link to="/admin">
        <button className="admin-btn">Admin Panel</button>
      </Link>

    )}
  </div>
      
      </div>

      {reports.length === 0 && (
        <p className="empty-text">No reports yet. Go be a responsible citizen.</p>
      )}

      <div className="report-list">
        {reports.map((r) => (
          <div key={r._id} className="report-card">

            {r.image && (
              <img
                src={r.image}
                alt="Waste"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px"
                }}
              />
            )}

            <p><b>Description:</b></p>
            <p>{r.description}</p>

            <span className={`status ${(r.status || "pending").toLowerCase()}`}>
              {r.status}
            </span>
            {role === "admin" && (

              <div className="admin-actions">

                <button
                className="clean-btn"
                onClick={() => markAsCleaned(r._id)}
                >
                  Mark as Cleaned
                  </button>
                  </div>
                )}
            {(role === "admin" || r.user === JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id) && (
              <button
              className="delete-btn"
              onClick={() => deleteReport(r._id)}
            >
              🗑 Delete
              </button>
            )}



  


          </div>
        ))}
      </div>

    </div>
  </div>
)
}