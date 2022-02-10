const mongoose = require("mongoose");


const dbUri = 'mongodb://localhost:27017/blog_app';
const connectDB = async () => {
  const conn = await mongoose.connect(dbUri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  });

  console.log(`MongoDB Connected:${conn.connection.host}`.cyan);
};

module.exports = connectDB;