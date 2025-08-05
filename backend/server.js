
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const Secret = mongoose.model('Secret', new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

app.post('/api/secrets', async (req, res) => {
  const newSecret = new Secret({ content: req.body.content });
  await newSecret.save();
  res.json(newSecret);
});

app.get('/api/secrets', async (req, res) => {
  const secrets = await Secret.find().sort({ createdAt: -1 }).limit(50);
  res.json(secrets);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
