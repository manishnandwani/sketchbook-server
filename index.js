const express = require('express');
const {createServer} = require('http');
const app = express();
const httpServer = createServer(app);

const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3000' : 'https://sketchbook-omega.vercel.app'

const cors = require('cors')
app.use(cors({origin : URL}))

const { Server } = require("socket.io");
const io = new Server(httpServer, {cors : URL});

io.on("connection", (socket) => {
    console.log("server connected")
    socket.on('beginPath', (arg) => {
        socket.broadcast.emit('beginPath',arg)
    })

    socket.on('drawLine',(arg) =>{
        socket.broadcast.emit('drawLine',arg)
    })

    socket.on('changeTool',(arg) =>{
        socket.broadcast.emit('changeTool',arg)
    })
});

httpServer.listen(5000);

