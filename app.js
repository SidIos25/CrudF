const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Updated MongoDB connection string without deprecated options
mongoose.connect("mongodb://127.0.0.1:27020,127.0.0.1:27021,127.0.0.1:27022/CBIT", {
  replicaSet: 'm101'  // Use your actual replica set name
})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Define a Mongoose schema and model
const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true }
});

const DataModel = mongoose.model('Data', DataSchema);

// POST route to create data
app.post('/data', async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    res.status(400).send({ message: 'Error creating data', error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
