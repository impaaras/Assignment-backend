"use strict";

const { UID } = require("@strapi/strapi");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    let { Server } = require("socket.io");

    let io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:55487/",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    let msg = [];
    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
      socket.on("sendMsg", (msgs) => {
        msg.push({
          id: new Date().getTime(),
          uid: socket.id,
          msg: msgs,
        });
        io.emit("recvMsg", msg);
      });
      socket.on("diconnected", () => {
        console.log("A user disconnected", socket.id);
      });
    });
    strapi.io = io;
  },
};
