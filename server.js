// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv\config");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static frontend files
app.use(express.static("public")); // folder z HTML/CSS/JS

// Endpoint formularza kontaktowego
app.post("/send", async (req, res) => {
  const { imie, email, wiadomosc } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nowa wiadomość od ${imie}`,
      text: wiadomosc,
    });

    res.status(200).json({ message: "Wiadomość wysłana!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});