const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoutes = require("./routes/auth")
require("dotenv").config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/reports", require("./routes/report"))


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.get("/", (req, res) => {
  res.send("API running")
})

app.listen(5000, () => console.log("Server running on 5000"))
