require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const itemRoutes = require("./src/routes/user");
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});