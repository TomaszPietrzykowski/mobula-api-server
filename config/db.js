const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DB_URI.replace('<PASSWORD>', process.env.DB_PASSWORD),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log(
      `MongoDB connected\nDB name: ${conn.connection.name}\nDB host: ${conn.connection.host}`
        .cyan.bold
    )
    // console.log(conn)
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = connectDB
