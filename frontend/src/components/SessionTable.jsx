// src/components/SessionTable.jsx
import React from "react";

export default function SessionTable({ sessions = [], onLogout }) {
  return (
    <table className="session-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>IP</th>
          <th>Device</th>
          <th>Location</th>
          <th>Login Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((s, i) => (
          <tr key={i}>
            <td>{s.email}</td>
            <td>{s.ip}</td>
            <td>{s.device}</td>
            <td>{s.location}</td>
            <td>{s.loginTime ? new Date(s.loginTime).toLocaleString() : "-"}</td>
            <td>
              <button onClick={() => onLogout(s.email)}>Logout</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}