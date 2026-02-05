require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./db");

const http = require('http');

const server = http.createServer(app)

async function main() {
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    await connectDB()
    const port = process.env.PORT || 4000
    server.listen(port, async () => {
    console.log(`Sever is running on port ${port}`);
  });
}


main().catch((err) => console.log(err));

