// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import OtpModal from "./OtpModal";

export default function Header() {
  const [showOtp, setShowOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(
    localStorage.getItem("otpVerified") === "true"
  );

  useEffect(() => {
    // if otpToken exists, set verified state (in case page refreshed)
    const otpToken = localStorage.getItem("otpToken");
    if (otpToken) {
      setOtpVerified(true);
      localStorage.setItem("otpVerified", "true");
    }
  }, []);

  const onVerify = () => {
    setOtpVerified(true);
    localStorage.setItem("otpVerified", "true");
  };

  return (
    <header className="header">
      <h1>Admin Panel</h1>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setShowOtp(true)}>Verify OTP</button>

        <button
          disabled={!otpVerified}
          onClick={() => {
            // only fire when enabled
            const event = new CustomEvent("viewDevices");
            window.dispatchEvent(event);
          }}
        >
          View Login Devices
        </button>
      </div>

      <OtpModal visible={showOtp} onClose={() => setShowOtp(false)} onVerify={onVerify} />
    </header>
  );
}