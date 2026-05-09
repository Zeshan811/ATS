const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    branch: {
      type: String,
      enum: ["Islamabad", "Lahore", "Karachi", "Remote"],
      required: true,
    },
    availableSeats: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Links to the HR who posted it
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
