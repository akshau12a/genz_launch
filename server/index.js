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
    const { firstName, lastName, email } = req.body;
    try {
        const newUser = new User({ firstName, lastName, email });
        await newUser.save();
        res.status(201).json({ message: 'Successfully saved!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save user' });
    }
});

app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
});
