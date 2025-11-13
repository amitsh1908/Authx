// src/components/OtpModal.jsx
import React, { useState } from "react";
import { api } from "../utils/api";

export default function OtpModal({ visible, onClose, onVerify }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const loginToken = localStorage.getItem("token");

  const sendOtp = async () => {
    if (!mobile) {
      alert("Please enter mobile with country code");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post(
        "/admin/send-otp",
        { mobile },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      console.log("OTP (dev):", res.data.otp);
      alert("OTP sent successfully");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(
        "/admin/verify-otp",
        { mobile, otp },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      const otpToken = res.data.otpToken;
      localStorage.setItem("otpToken", otpToken);
      localStorage.setItem("otpVerified", "true");

      alert("OTP Verified Successfully");
      onVerify?.();
      onClose?.();
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Admin OTP Verification</h3>

        {step === 1 && (
          <>
            <p>Enter mobile number with country code:</p>
            <input
              type="text"
              placeholder="+91XXXXXXXXXX"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button onClick={sendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Enter OTP sent to your mobile</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        <button onClick={onClose} style={{ marginTop: 10 }}>
          Close
        </button>
      </div>
    </div>
  );
}