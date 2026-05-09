const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Create the transporter (logs into Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `ATS Software House <${process.env.GMAIL_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
