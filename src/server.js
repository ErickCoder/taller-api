require("dotenv").config();
const app = require("./app");
const { db } = require("./database/config");
const initModel = require("./models/init.model");

db.authenticate()
  .then(() => console.log("Database connected🍕"))
  .catch((err) => console.log(err));

initModel();

db.sync({ force: false })
  .then(() => console.log("Database syncrhonized🍕"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3021;
app.listen(PORT, () => {
  console.log("Server is up on port 3020");
});
