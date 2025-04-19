const socket = io();

const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const usernameInput = document.getElementById("username");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pseudo = usernameInput.value.trim() || "Anonyme";
  const msg = input.value.trim();

  if (msg !== "") {
    socket.emit("chat message", { pseudo, msg });
    input.value = "";
  }
});

socket.on("chat message", ({ pseudo, msg }) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${pseudo}</strong> : ${msg}`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});
