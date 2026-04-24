const express = require("express");
const cors = require("cors");
require("dotenv").config();

const queryRoutes = require("./routes/queryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", queryRoutes);

app.get("/", (req, res) => {
  res.send("AI MySQL Assistant Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});