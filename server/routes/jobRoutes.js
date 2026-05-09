const express = require("express");
const router = express.Router();
const { createJob, getAllJobs } = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public route: Anyone can view jobs
router.get("/", getAllJobs);

// Protected route: Only logged-in HR users can create jobs
router.post("/", protect, authorize("HR"), createJob);

module.exports = router;
