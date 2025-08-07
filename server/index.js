// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/User');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.post('/api/notify', async (req, res) => {
    const { firstName, lastName, email, contactNo } = req.body; // ✅ Add contactNo
    try {
        const newUser = new User({ firstName, lastName, email, contactNo }); // ✅ Save contactNo
        await newUser.save();
        res.status(201).json({ message: 'Successfully saved!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save user' });
    }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
