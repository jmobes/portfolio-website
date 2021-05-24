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
  const { name, email, message } = req.body;
  if (typeof name !== "string" && typeof email !== "string") {
    const error = new Error("Invalid name or email");
    error.code = 400;
    return next(error);
  }
  if (message !== undefined && typeof message !== "string") {
    const error = new Error("Invalid message");
    error.code = 400;
    return next(error);
  }
  res.send({ name, email, message });
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
