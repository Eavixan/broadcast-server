#!/usr/bin/env node

const readline = require("readline");
const { Command } = require("commander");
const WebSocket = require("ws");

const program = new Command();

program
    .name("broadcast-server")
    .description("CLI broadcast server using WebSockets")
    .version("1.0.0");

program
    .command("start")
    .description("Start the WebSocket broadcast server")
    .option("-p, --port <port>", "Port number", "8080")
    .action((options) => {
        const port = Number(options.port);

        const server = new WebSocket.Server({ port });

        console.log(`Broadcast server running on ws://localhost:${port}`);

        server.on("connection", (socket) => {
            console.log("New client connected");

            socket.send("Welcome to the broadcast server!");

            socket.on("message", (message) => {
                console.log(`Received: ${message}`);

                server.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message.toString());
                    }
                });
            });

            socket.on("close", () => {
                console.log("Client disconnected");
            });
        });
    });

program
    .command("connect")
    .description("Connect as a client to the broadcast server")
    .option("-u, --url <url>", "Server URL", "ws://localhost:8080")
    .action((options) => {
        const socket = new WebSocket(options.url);

        socket.on("open", () => {
            console.log(`Connected to ${options.url}`);
            console.log("Type a message and press Enter to send it.");

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.on("line", (input) => {
                socket.send(input);
            });
        });

        socket.on("message", (message) => {
            console.log(`Message: ${message}`);
        });

        socket.on("close", () => {
            console.log("Disconnected from server");
        });

        socket.on("error", (error) => {
            console.log("Connection error:", error.message);
        });
    });

program.parse(process.argv);