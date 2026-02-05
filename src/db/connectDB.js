const mongoose = require('mongoose');

const connectDB = async ()=>{

  const DBconnection = process.env.DATABASE_URL
  await mongoose.connect(DBconnection, {dbName: process.env.DATABASE_NAME});
}

module.exports = connectDB