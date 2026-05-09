const Application = require("../models/Application");

// @route   POST /api/applications/:jobId
// @desc    Apply for a job (Candidate ONLY)

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // 1. Log exactly what Postman/Cloudinary is giving us
    console.log("--- DEBUG: FILES RECEIVED ---");
    console.log(JSON.stringify(req.files, null, 2));

    // 2. Ensure files actually made it to the server
    if (!req.files || !req.files["resume"] || !req.files["coverLetter"]) {
      return res.status(400).json({
        message: "Please upload both resume and cover letter in Postman",
      });
    }

    // 3. Extract the URLs safely (Checks for .path, .secure_url, or .url)
    const resumeData = req.files["resume"][0];
    const coverLetterData = req.files["coverLetter"][0];

    const resumeUrl =
      resumeData.path || resumeData.secure_url || resumeData.url;
    const coverLetterUrl =
      coverLetterData.path || coverLetterData.secure_url || coverLetterData.url;

    // 4. Create the application
    const application = new Application({
      job: jobId,
      candidate: req.user.userId,
      resumeUrl,
      coverLetterUrl,
    });

    await application.save();

    res
      .status(201)
      .json({ message: "Application submitted successfully!", application });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// @route   GET /api/applications/job/:jobId
// @desc    Get all applications for a specific job (HR ONLY)
exports.getApplicationsForJob = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate("candidate", "name email") // Get candidate details
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const sendEmail = require("../utils/sendEmail");

// @route   PUT /api/applications/:id/status
// @desc    Update application status & send email (HR ONLY)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, customMessage } = req.body; // e.g., "Shortlisted", "Rejected"
    const application = await Application.findById(req.params.id).populate(
      "candidate",
      "name email"
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update status in database
    application.status = status;
    await application.save();

    // Prepare the email content
    const subject = `Update on your job application: ${status}`;
    const message =
      customMessage ||
      `Hello ${application.candidate.name},\n\nYour application status has been updated to: ${status}.\n\nThank you,\nHR Team`;

    // Send the email
    await sendEmail({
      email: application.candidate.email,
      subject: subject,
      message: message,
    });

    res.status(200).json({
      message: "Status updated and email sent successfully!",
      application,
    });
  } catch (error) {
    console.error("EMAIL/STATUS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
