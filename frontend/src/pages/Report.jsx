import { useState } from "react"
import api from "../services/api"
import "../styles/report.css"
import MapPicker from "../components/MapPicker" // ✅ REQUIRED

export default function Report() {
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState(null)
  const [location, setLocation] = useState(null)

  const submitReport = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("description", desc)
    formData.append("image", image)

    if (location) {
      formData.append("location", JSON.stringify(location))
    }

    try {
      const token = localStorage.getItem("token")

      await api.post("/reports", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      })

      alert("Report submitted")

      // optional reset
      setDesc("")
      setImage(null)
      setLocation(null)

    } catch (err) {
      console.error("Failed to submit report:", err)
      alert("Failed to submit report")
    }
  }

  return (
    <div className="report-page">
      <div className="report-card">
        <h2>New Report</h2>

        <form className="report-form" onSubmit={submitReport}>
          <MapPicker location={location} setLocation={setLocation} />

          <textarea
            placeholder="Describe the issue"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button type="submit">Submit Report</button>
        </form>
      </div>
    </div>
  )
}