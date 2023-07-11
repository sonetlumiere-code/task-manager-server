const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const taskRoutes = require('./routes/task.js');

const app = express();
const port = process.env.PORT || 3434;

// Connect to MongoDB
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  return res.status(200).send('task manager API')
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

module.exports = app;