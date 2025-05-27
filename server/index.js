// handles the real MongoDB connection and start the server for production/development.

const mongoose = require('mongoose');
const app = require('./server');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  // Remove useNewUrlParser and useUnifiedTopology if using Mongoose 6+
})
.then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  console.log('Connected to MongoDB Atlas!');
})
.catch((err) => console.error('MongoDB connection error:', err));

