import Session from "../models/Session.js";

// Get Active Sessions of specific user
export const getUserActiveSessions = async (req, res) => {
  try {
    const email = req.params.email;

    const sessions = await Session.find({ email, revoked: false })
      .sort({ loginTime: -1 });

    res.status(200).json({
      count: sessions.length,
      sessions
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logout all sessions for specific user
export const logoutSpecificSession = async (req, res) => {
  try {
    const { email } = req.body;

    const update = await Session.updateMany(
      { email, revoked: false },
      { $set: { revoked: true } }
    );

    res.status(200).json({
      message: "All active sessions logged out",
      count: update.modifiedCount
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};