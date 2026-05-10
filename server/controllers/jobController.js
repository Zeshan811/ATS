const Job = require("../models/Job");

// @route   POST /api/jobs
// @desc    Create a new job (HR ONLY)
exports.createJob = async (req, res) => {
  try {
    const { title, description, department, branch, availableSeats } = req.body;

    const job = new Job({
      title,
      description,
      department,
      branch,
      availableSeats,
      createdBy: req.user.userId,
    });

    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// // @route   GET /api/jobs
// // @desc    Get all jobs (Public
// exports.getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find().sort({ createdAt: -1 }); // Newest first
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// @route   GET /api/jobs
// @desc    Get all jobs (Public with filters)
exports.getAllJobs = async (req, res) => {
  try {
    const { search, branch, department, type } = req.query;

    let filter = {};

    // 🔍 Search by title
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    if (branch) {
      filter.branch = branch;
    }

    if (department) {
      filter.department = department;
    }

    if (type) {
      filter.type = type;
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      jobs,   // ✅ important (not raw array)
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};