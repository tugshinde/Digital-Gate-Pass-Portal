// QRCodeCard Component
import React from "react";

const QRCodeCard = ({ qrCode, passId }) => {
  if (!qrCode) {
    return null;
  }

  return (
    <div className="qr-code-container">
      <h3>QR Code</h3>
      <img src={qrCode} alt={`QR Code for Pass ${passId}`} />
    </div>
  );
};

export default QRCodeCard;
