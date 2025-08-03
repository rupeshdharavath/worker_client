const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// ✅ REMOVE DUPLICATE `app.use(cors())`
app.use(cors({
  origin: ['https://worker-client.vercel.app'], 
  credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e.message));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/application', require('./routes/application'));
app.use('/api/message', require('./routes/messages'));
app.use('/api/slot', require('./routes/slot'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
