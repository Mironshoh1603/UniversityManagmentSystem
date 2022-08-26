const env = require("dotenv").config({ path: "./config.env" });

const app = require("./middleware/app");

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server is listened by ${port} port`);
});
