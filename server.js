require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
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
  res.sendFile(path.join(__dirname, "/index.html"));
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

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASS,
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.MY_EMAIL,
    subject: "Inquiry from Portfolio Site",
    text: `
    FROM: ${name}
    EMAIL: ${email}
    MESSAGE: ${message}
      `,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      const error = new Error("Unable to send email. Please try again.");
      error.code = 500;
      return next(error);
    } else {
      res.json({ success: "Message was sent successfully." });
    }
  });
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
