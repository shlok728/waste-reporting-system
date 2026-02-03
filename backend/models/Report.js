const mongoose = require("mongoose")


const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  location: {lat: Number,lng: Number},

})

module.exports = mongoose.model("Report", reportSchema)
