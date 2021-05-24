const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.get("/", (req, res, next) => {
  res.send("HELLO!");
});

app.post("/email", (req, res, next) => {
  console.log("REQ BODY: ", req.body);
  const { name, email, message } = req.body;
  console.log({ name, email, message });
  res.send({ name, email, message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
