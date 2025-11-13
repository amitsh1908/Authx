import React, { useState } from "react";
import OtpModal from "./OtpModal";

function Header() {
  const [showOtp, setShowOtp] = useState(false);

  const [otpVerified, setOtpVerified] = useState(
    localStorage.getItem("otpVerified") === "true"
  );

  const handleOtpVerified = () => {
    setOtpVerified(true);
    localStorage.setItem("otpVerified", "true");
  };

  return (
    <header className="header">
      <h1>Admin Panel</h1>

      <div style={{ display: "flex", gap: "12px" }}>
        
        <button onClick={() => setShowOtp(true)}>
          Verify OTP
        </button>

        <button
          disabled={!otpVerified}
          onClick={() => {
            const event = new CustomEvent("viewDevices");
            window.dispatchEvent(event);
          }}
        >
          View Login Devices
        </button>
      </div>

      <OtpModal
        visible={showOtp}
        onClose={() => setShowOtp(false)}
        onVerify={handleOtpVerified}
      />
    </header>
  );
}

export default Header;