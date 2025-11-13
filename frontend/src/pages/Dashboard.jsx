// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SessionTable from "../components/SessionTable";
import { api } from "../utils/api";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const otpToken = localStorage.getItem("otpToken");

  useEffect(() => {
    function handleView() {
      if (!localStorage.getItem("otpVerified") || !otpToken) {
        alert("Please verify OTP first");
        return;
      }
      if (!email) {
        alert("Enter the target user email to view devices");
        return;
      }
      fetchSessions();
    }

    window.addEventListener("viewDevices", handleView);
    return () => window.removeEventListener("viewDevices", handleView);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, otpToken]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/user-sessions/${encodeURIComponent(email)}`, {
        headers: { Authorization: `Bearer ${otpToken}` },
      });
      setSessions(res.data.sessions || []);
      if ((res.data.sessions || []).length === 0) {
        alert("No active devices for this user");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (userEmail) => {
    if (!otpToken) {
      alert("OTP token missing");
      return;
    }
    try {
      await api.post(
        "/admin/logout-session",
        { email: userEmail },
        { headers: { Authorization: `Bearer ${otpToken}` } }
      );
      alert("Logged out user sessions");
      fetchSessions();
    } catch (err) {
      alert(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>View User Login Devices</h2>
        <p>Enter the user email whose devices you want to see</p>
        <input
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p style={{ marginTop: 10 }}>
          After OTP verification, click <b>View Login Devices</b> in header.
        </p>

        {loading && <p>Loading...</p>}

        {sessions.length > 0 && <SessionTable sessions={sessions} onLogout={handleLogout} />}
      </div>
    </div>
  );
}