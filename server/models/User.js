const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Candidate", "HR"],
      //model js set according to roles based
      default: "Candidate",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
