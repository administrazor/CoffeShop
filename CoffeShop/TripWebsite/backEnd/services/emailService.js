const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 587,
  secure: false,
  auth: {
    user: "ramimassalkhi@gmail.com",
    pass: "cara phak cfyc arxl",
  },
});

async function sendBadReviewEmail(review) {
  const mailOptions = {
    from: '"Coffee Shop Reviews" <ramimassalkhi@gmail.com>',
    to: "ramimassalkhi@gmail.com",
    subject: "⚠️ Bad Review Received",
    text: `A customer left a low-rated review:\n\nRating: ${review.rating}\nMessage: ${review.review}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Bad review email sent.");
  } catch (error) {
    console.error("Failed to send bad review email:", error);
  }
}

module.exports = { sendBadReviewEmail };
