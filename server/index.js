import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3001;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  
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

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});




