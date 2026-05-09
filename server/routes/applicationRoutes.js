const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getApplicationsForJob,
} = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Route for candidates to apply
router.post(
  "/:jobId",
  protect,
  authorize("Candidate"),
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  applyForJob
);

// Route for HR to view applications for a specific job
router.get("/job/:jobId", protect, authorize("HR"), getApplicationsForJob);

module.exports = router;
