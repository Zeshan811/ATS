const cloudinary = require("cloudinary"); // <-- Changed to root object
const multerStorage = require("multer-storage-cloudinary");
const CloudinaryStorage = multerStorage.CloudinaryStorage || multerStorage;
const multer = require("multer");

// Configure Cloudinary (We explicitly call .v2.config here)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // <-- Now it receives the base object it expects
  params: {
    folder: "ats_resumes",
    allowed_formats: ["pdf", "doc", "docx", "jpg", "png"],
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
//Multer setting update