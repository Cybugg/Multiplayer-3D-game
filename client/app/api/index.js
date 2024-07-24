import {Server} from "socket.io"
import http from "http"
import express from "express"
import axios from "axios"
import next from "next"

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = socketIO(httpServer);

    io.on("connection",(socket)=> {
        console.log("user connected");
        characters.push({
            id:socket.id,
            position:generateRandomPosition(),
            main_color:generateRandomHexColor(),
            lining_color:generateRandomHexColor()
        })
         
        io.emit("characters", characters )
        socket.emit("Hello");
    
        socket.on("disconnect", () => {
            console.log("user disconnected")
              characters.splice(characters.findIndex(character => character.id === socket.id),1);
              io.emit("characters", characters )
        })
        server.all('*', (req, res) => {
            return handle(req, res);
        });
    
        const PORT = process.env.PORT || 3001;
        httpServer.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
      
    })

})

const characters = []; 

function generateRandomPosition (){
    return [Math.random()*3,Math.random()*3]
};

function generateRandomHexColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
};


