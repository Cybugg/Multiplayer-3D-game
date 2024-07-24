"use client"
import {io} from "socket.io-client"
import {useEffect, useState} from "react"


export const socket = io("http://localhost:3001");

export const SocketManager = () => {
    const [connected,setConnected] = useState(false)
    useEffect(()=>{
        function onConnect(){
            console.log("connected")
            setConnected(true);
        }
        function onDisconnect(){
            console.log("Disconnected")
        }
        function onHello(){
            console.log("hello")
        }
        function onCharacters(value){
            console.log("characters",value); 
        }
       if(!connected){ socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("hello", onHello)
        socket.on("characters", onCharacters)}
        return ()=>{
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("hello", onHello)
            socket.off("characters", onCharacters)
        }
    },[])
}

