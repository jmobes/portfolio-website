const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send("HELLO!");
});

app.post("/email", (req, res, next) => {
  console.log(req.body);
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
