const app = require("./app");
const path = require("path");

const configPath = path.join(__dirname, "config", ".env");

require("colors");
require("dotenv").config({ path: configPath });

const connectDB = require("./config/connectDB");

console.log(connectDB());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
