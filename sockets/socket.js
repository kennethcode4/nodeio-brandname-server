const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Héroes del Silencio"));
bands.addBand(new Band("Metállica"));

// Sockets's Messages
io.on("connection", (client) => {
  console.log("Client conected");

  client.emit("active-bands", bands.getBands());

  client.on("message", (payload) => {
    console.log("Message received from client: ", payload);
    io.emit("message", { admin: "New message" });
  });

  client.on("disconnect", (data) => {
    console.log("Disconeted client");
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-band", bands.getBands());
  });

  // client.on("emitir-mensaje", (payload) => {
  //   console.log("Flutter emitiendo : ", payload);
  //   client.broadcast.emit("emitir-mensaje", payload); // emite a todos menos al cliente que emitio
  // });
});
