// // Email Service using NodeMailer
// const nodemailer = require("nodemailer");

// // Create transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Send approval email
// const sendApprovalEmail = async (email, studentName, passDetails, qrCode) => {
//   try {
//     const htmlContent = `
//       <h2>Gate Pass Approved</h2>
//       <p>Dear ${studentName},</p>
//       <p>Your gate pass has been <strong>APPROVED</strong></p>
//       <br/>
//       <h3>Pass Details:</h3>
//       <p><strong>Pass ID:</strong> ${passDetails.passId}</p>
//       <p><strong>Name:</strong> ${passDetails.fullName}</p>
//       <p><strong>Department:</strong> ${passDetails.department}</p>
//       <p><strong>Roll Number:</strong> ${passDetails.rollNumber}</p>
//       <p><strong>Purpose:</strong> ${passDetails.purpose}</p>
//       <p><strong>Out Date:</strong> ${passDetails.outDate}</p>
//       <p><strong>Out Time:</strong> ${passDetails.outTime}</p>
//       <p><strong>Return Date:</strong> ${passDetails.returnDate}</p>
//       <p><strong>Return Time:</strong> ${passDetails.returnTime}</p>
//       <br/>
//       <p>Your QR Code:</p>
//       <p>${qrCode}</p>
//       <br/>
//       <p>Best regards,<br/>Smart Gate Pass Management System</p>
//     `;

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Gate Pass Approved - Smart Gate Pass Management Portal",
//       html: htmlContent,
//     });

//     console.log("Approval email sent successfully");
//     return true;
//   } catch (error) {
//     console.error("Error sending approval email:", error.message);
//     return false;
//   }
// };

// // Send rejection email
// const sendRejectionEmail = async (email, studentName, passDetails, reason) => {
//   try {
//     const htmlContent = `
//       <h2>Gate Pass Rejected</h2>
//       <p>Dear ${studentName},</p>
//       <p>Your gate pass has been <strong>REJECTED</strong></p>
//       <br/>
//       <h3>Pass Details:</h3>
//       <p><strong>Name:</strong> ${passDetails.fullName}</p>
//       <p><strong>Department:</strong> ${passDetails.department}</p>
//       <p><strong>Roll Number:</strong> ${passDetails.rollNumber}</p>
//       <p><strong>Purpose:</strong> ${passDetails.purpose}</p>
//       <br/>
//       <p><strong>Rejection Reason:</strong> ${reason}</p>
//       <p>Please contact the admin if you have any questions.</p>
//       <br/>
//       <p>Best regards,<br/>Smart Gate Pass Management System</p>
//     `;

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Gate Pass Rejected - Smart Gate Pass Management Portal",
//       html: htmlContent,
//     });

//     console.log("Rejection email sent successfully");
//     return true;
//   } catch (error) {
//     console.error("Error sending rejection email:", error.message);
//     return false;
//   }
// };

// module.exports = {
//   sendApprovalEmail,
//   sendRejectionEmail,
// };
