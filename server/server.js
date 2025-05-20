const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// TODO: Add your MongoDB connection string
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('API Running'));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
