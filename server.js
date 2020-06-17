const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db');
const bodyParser = require('body-parser');

const path = require('path');

require('dotenv').config();

//  Connect db
connectDB();

app.use(express.json({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(cors());

// Define Route
app.use('/api/orders', require('./routes/orderRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/products', require('./routes/productRoute'));

// Server  static assests in production
if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
