# Broadcast Server CLI

A simple CLI-based WebSocket broadcast server built with Node.js.

This project allows multiple clients to connect to a server and send messages. When one client sends a message, the server broadcasts that message to all connected clients.

## Goal

The goal of this project is to understand how real-time communication works using WebSockets.

This is similar to how chat apps, live scoreboards, multiplayer apps, and real-time notification systems work.

## Features

- Start a WebSocket server from the terminal
- Connect multiple clients from the terminal
- Send messages from one client to all connected clients
- Add client names to messages
- Handle client connection and disconnection
- Use CLI commands with `commander`
- Use WebSockets with the `ws` package

## Technologies Used

- Node.js
- WebSocket
- ws
- Commander
- Nodemon

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/broadcast-server.git
```

Go inside the project folder:

```bash
cd broadcast-server
```

Install dependencies:

```bash
npm install
```

## Run Without Global CLI

Start the server:

```bash
node src/index.js start
```

Connect a client:

```bash
node src/index.js connect --name Mehedi
```

Connect another client in a new terminal:

```bash
node src/index.js connect --name Alex
```

Now type a message from any client. The message will be sent to all connected clients.

## Run as a CLI Command

To use the command globally on your computer, run:

```bash
npm link
```

Now start the server:

```bash
broadcast-server start
```

Connect a client:

```bash
broadcast-server connect --name Mehedi
```

Connect another client:

```bash
broadcast-server connect --name Alex
```

## Custom Port

Start the server on a custom port:

```bash
broadcast-server start --port 5000
```

Connect to that server:

```bash
broadcast-server connect --url ws://localhost:5000 --name Mehedi
```

## Available Commands

### Start Server

```bash
broadcast-server start
```

Starts the WebSocket broadcast server.

Optional port:

```bash
broadcast-server start --port 8080
```

### Connect Client

```bash
broadcast-server connect --name Mehedi
```

Connects a client to the WebSocket server.

Optional URL:

```bash
broadcast-server connect --url ws://localhost:8080 --name Mehedi
```

## How It Works

The server waits for clients to connect.

When a client connects, the server keeps that connection open.

When one client sends a message, the server receives it and loops through all connected clients.

Then the server sends the message to every connected client.

Basic flow:

```txt
Client sends message
        ↓
Server receives message
        ↓
Server checks all connected clients
        ↓
Server broadcasts message to everyone
```

## WebSocket Concept

HTTP usually works like this:

```txt
Client sends request
Server sends response
Connection ends
```

WebSocket works like this:

```txt
Client connects once
Connection stays open
Client and server can keep sending messages
```

That is why WebSocket is useful for real-time applications.

## Project Structure

```txt
broadcast-server/
├── src/
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

## Example

Terminal 1:

```bash
broadcast-server start
```

Terminal 2:

```bash
broadcast-server connect --name Mehedi
```

Terminal 3:

```bash
broadcast-server connect --name Alex
```

If Mehedi types:

```txt
Hello everyone
```

All connected clients will receive:

```txt
Faviyan: Hello everyone
```

## Future Improvements

Possible features to add later:

- Private messages
- Message history
- User join/leave notifications
- Authentication
- Chat rooms
- Save messages in a database
- Better error handling
- Colored terminal output

[## Author

Created by Mehedi as a beginner-friendly WebSocket CLI project.](https://roadmap.sh/projects/broadcast-server)
