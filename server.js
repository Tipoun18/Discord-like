const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Tu peux directement servir le fichier HTML
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // Charge ton index.html depuis la racine du projet
});

io.on("connection", (socket) => {
  console.log("✅ Un utilisateur s’est connecté");

  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s’est déconnecté");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
