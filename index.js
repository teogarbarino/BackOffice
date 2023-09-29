const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const scoresRoute = require("./routes/score");
const dailyRoute = require("./routes/daily");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL
).then(() => console.log("DBConnection Succesfull!")).catch((err) => {
  console.log(err);
});

app.get("/api/test", () => {
  console.log("test is succesfull");
});

// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Remplacez par l'URL de votre site web
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    // Répondre aux pré-vérifications CORS (demandes OPTIONS)
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: "10mb" }));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/scores", scoresRoute);
app.use("/api/daily", dailyRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is running!");
});
