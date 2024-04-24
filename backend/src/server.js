const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user_routes");
const sequelize = require("db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
