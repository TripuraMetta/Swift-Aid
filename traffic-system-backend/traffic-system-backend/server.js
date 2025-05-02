const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let trafficSignal = "red"; // Default signal

io.on("connection", (socket) => {
    console.log("🚗 Client connected");

    // Send current signal status to new clients
    socket.emit("signal-update", trafficSignal);

    // Handle ambulance alert
    socket.on("ambulance-alert", () => {
        console.log("🚑 Ambulance Alert! Turning Green...");
        trafficSignal = "green";
        io.emit("signal-update", trafficSignal);
        
        // Reset signal after 5 seconds
        setTimeout(() => {
            trafficSignal = "red";
            io.emit("signal-update", trafficSignal);
            console.log("🔴 Resetting Signal to Red");
        }, 5000);
    });

    socket.on("disconnect", () => {
        console.log("❌ Client Disconnected");
    });
});

server.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});
