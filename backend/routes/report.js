const express = require("express")
const Report = require("../models/Report")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const router = express.Router()
const multer = require("multer")
const { storage } = require("../config/cloudinary")

const upload = multer({ storage })

// CREATE REPORT (USER)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const report = new Report({
      description: req.body.description,
      image: req.file?.path,
      location: req.body.location ? JSON.parse(req.body.location) : null,

      user: req.user.id,        // ✅ FIXED
      status: "pending"

    })

    await report.save()
    res.json({ msg: "Report saved" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Server error" })
  }
})

// GET MY REPORTS (USER)
router.get("/my", auth, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }) // ✅ FIXED
    res.json(reports)
  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
})

// GET ALL REPORTS (ADMIN)
router.get("/", auth, admin, async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "name email")
    res.json(reports)
  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
})

// MARK CLEANED (ADMIN)
router.put("/:id/clean", auth, admin, async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "cleaned" },
      { new: true }
    )

    if (!report) return res.status(404).json({ msg: "Report not found" })

    res.json(report)
  } catch (err) {
    res.status(500).json({ msg: "Server error" })
  }
})
router.get("/stats", auth, admin, async (req, res) => {
  try {
    const total = await Report.countDocuments()
    const pending = await Report.countDocuments({ status: "pending" })
    const cleaned = await Report.countDocuments({ status: "cleaned" })

    res.json({ total, pending, cleaned })
  } catch {
    res.status(500).json({ msg: "Server error" })
  }
})
// DELETE REPORT
router.delete("/:id", auth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)

    if (!report) {
      return res.status(404).json({ msg: "Report not found" })
    }

    // allow delete if admin OR owner
    if (
      report.user.toString() !== req.user &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" })
    }

    await report.deleteOne()
    res.json({ msg: "Report deleted" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Server error" })
  }
})


module.exports = router
