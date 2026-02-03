import { useEffect, useState } from "react"
import api from "../services/api"
import "../styles/admin.css"

export default function Admin() {
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
        console.log("ADMIN FETCH ERROR:", err)
      }
    }

    fetchAllReports()
  }, [])

  const markAsCleaned = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.put(
        `/reports/${id}/clean`,
        {},
        { headers: { Authorization: token } }
      )

      setReports((prev) =>
        prev.map((r) => (r._id === id ? res.data : r))
      )
    } catch (err) {
      console.log.alert("Action failed",err)
    }
  }

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      <div className="admin-report-list">
        {reports.map((r) => (
          <div key={r._id} className="admin-report-card">
            {r.image && <img src={r.image} alt="waste" />}

            <p>{r.description}</p>

            <span className={`status ${r.status}`}>
              {r.status}
            </span>

            {r.status !== "cleaned" && (
              <button onClick={() => markAsCleaned(r._id)}>
                Mark Cleaned
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
