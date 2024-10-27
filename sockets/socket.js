const { io } = require("../index");

// Sockets's Messages
io.on("connection", (client) => {
  console.log("Client conected");

  client.on("message", (payload) => {
    console.log("Message received from client: ", payload);
    io.emit("message", { admin: "New message" });
  });

  client.on("disconnect", (data) => {
    console.log("Disconeted client");
  });
});
