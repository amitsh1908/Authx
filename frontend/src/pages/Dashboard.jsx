import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SessionTable from "../components/SessionTable";
import { api } from "../utils/api";

function Dashboard() {
  const [email, setEmail] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const otpToken = localStorage.getItem("otpToken");

  useEffect(() => {
    function handleViewDevices() {
      if (!otpToken) {
        alert("Please verify OTP first!");
        return;
      }

      setShowEmailInput(true);
    }

    window.addEventListener("viewDevices", handleViewDevices);

    return () => window.removeEventListener("viewDevices", handleViewDevices);
  }, [otpToken]);

  const fetchSessions = async () => {
    if (!email) {
      alert("Enter user email first!");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/admin/user-sessions/${email}`, {
        headers: { Authorization: `Bearer ${otpToken}` },
      });
      setSessions(res.data.sessions);
      if(res.data.sessions.length === 0){
        alert("No active devices for this user");
      }
    } catch (err) {
      alert("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const logoutDevice = async (email) => {
    try {
      const res = await api.post(
        "/admin/logout-session",
        { email },
        { headers: { Authorization: `Bearer ${otpToken}` } }
      );
      alert("Device logged out!");
      fetchSessions();
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div>
      <Header />

      <div className="container">
        <h2>View User Login Devices</h2>

        {showEmailInput && (
          <>
            <input
              type="email"
              placeholder="Enter User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={fetchSessions}>View Devices</button>
          </>
        )}

        {loading && <p>Loading...</p>}

        {sessions.length > 0 && (
          <SessionTable sessions={sessions} logoutDevice={logoutDevice} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;