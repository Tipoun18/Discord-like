const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serveur de fichiers statiques (si tu utilises un dossier comme "public" ou autre)
app.use(express.static(__dirname));  // Cela va servir tous les fichiers depuis la racine du projet

// Ou servir juste index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
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

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});
