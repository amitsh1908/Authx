import React from "react";

function SessionTable({ sessions, logoutDevice }) {
  return (
    <table className="session-table">
      <thead>
        <tr>
          <th>IP</th>
          <th>Device</th>
          <th>Location</th>
          <th>Browser</th>
          <th>Date-Time</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {sessions.map((s, i) => (
          <tr key={i}>
            <td>{s.ip}</td>
            <td>{s.device}</td>
            <td>{s.location}</td>
            <td>{s.browser}</td>
            <td>{s.dateTime}</td>
            <td>
              <button onClick={() => logoutDevice(s.email)}>
                Logout Device
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SessionTable;