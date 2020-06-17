const mongoose = require('mongoose');
// const db = config.get('mongoURI');

const db =
  'mongodb+srv://burhan:burhan@cluster0-uyzla.mongodb.net/<dbname>?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
