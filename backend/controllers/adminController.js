import Session from "../models/Session.js";

// all active sessions of a user
export const getUserActiveSessions = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: "Email required" });

    const sessions = await Session.find({ email, revoked: false }).sort({ loginTime: -1 });

    if (sessions.length === 0)
      return res.status(404).json({ message: "No active sessions found for this user" });

    res.status(200).json({
      email,
      activeSessionCount: sessions.length,
      sessions: sessions.map((s) => ({
        id: s._id,
        ip: s.ip,
        device: s.device,
        location: s.location,
        loginTime: s.loginTime
      }))
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logout a specific session (admin-initiated)
export const logoutSpecificSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ message: "Session ID required" });

    const session = await Session.findByIdAndUpdate(
      sessionId,
      { $set: { revoked: true } },
      { new: true }
    );

    if (!session)
      return res.status(404).json({ message: "Session not found" });

    res.status(200).json({
      message: `Session revoked successfully for ${session.email}`,
      sessionId: session._id,
      email: session.email
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};