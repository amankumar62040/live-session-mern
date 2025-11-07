require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const Session = require('./models/session');
const Counter = require('./models/counter');

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/live_sessions_db';

// Connect to MongoDB
mongoose.connect(MONGO)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Function to auto-increment ID using Counter collection
async function getNextSequence(name) {
  const update = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return update.seq;
}

// 🟢 Start a new session (admin)
app.post('/api/sessions/start', async (req, res) => {
  try {
    const unique_id = uuidv4();
    const id = await getNextSequence('live_sessions');
    const userurl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/session/${unique_id}`;
;

    const session = new Session({
      id,
      type: 'admin',
      unique_id,
      userurl
    });

    await session.save();
    return res.json({ success: true, session });
  } catch (err) {
    console.error('Error starting session:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 🟢 Get session by unique_id
app.get('/api/sessions/:unique_id', async (req, res) => {
  try {
    const { unique_id } = req.params;
    const session = await Session.findOne({ unique_id });

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    return res.json({ success: true, session });
  } catch (err) {
    console.error('Error fetching session:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
