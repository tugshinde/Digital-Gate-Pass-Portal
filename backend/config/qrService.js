// QR Code Service
const QRCode = require("qrcode");

// Generate QR Code
const generateQRCode = async (passData) => {
  try {
    const qrData = {
      studentName: passData.fullName,
      passId: passData._id,
      department: passData.department,
      purpose: passData.purpose,
      outDate: passData.outDate,
      outTime: passData.outTime,
      returnDate: passData.returnDate,
      returnTime: passData.returnTime,
      status: passData.status,
    };

    const qrCodeString = await QRCode.toDataURL(JSON.stringify(qrData), {
      width: 200,
    });

    return qrCodeString;
  } catch (error) {
    console.error("Error generating QR code:", error.message);
    throw error;
  }
};

module.exports = {
  generateQRCode,
};
