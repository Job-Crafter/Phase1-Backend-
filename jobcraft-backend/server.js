require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auditRoute = require('./routes/audit');
const uploadRoute = require('./routes/upload');
const resumeRoute = require("./routes/resume");  
// const cohere = require("./utils/cohere"); 
const aiRoutes = require("./routes/ai");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('✅ MongoDB connected'))
// .catch(err => console.error('❌ MongoDB connection error:', err));
mongoose.connect(process.env.MONGO_URI)
  // .then(() => console.log('✅ MongoDB connected'))
  .then(() => console.log("Connected to DB:", mongoose.connection.name))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('JobCraft API running 🚀');
});

// Load Upload Route BEFORE listen()
app.use('/api/upload', uploadRoute);
app.use('/api/audit', auditRoute);
app.use("/api/resume", resumeRoute);
app.use("/api/ai", aiRoutes);
// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
