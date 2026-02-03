module.exports = function (req, res, next) {
  console.log("ADMIN CHECK ROLE:", req.user.role)
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin access denied" })
  }
  next()
}