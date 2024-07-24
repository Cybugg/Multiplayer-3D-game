import {Server} from "socket.io"

const io = new Server({
    cors:{
        origin:'http://localhost:3000',

    },
})


io.listen(3001)

const characters = []; 

function generateRandomPosition (){
    return [Math.random()*3,Math.random()*3]
};

function generateRandomHexColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
};


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

  
})