"use client"
import {Canvas} from "@react-three/fiber"
import {Experience} from "@/app/components/ThreeD/Experience"
import {SocketManager} from "./SocketManager"

export default function Scene (){

  return(
    
    <div className="h-screen w-full ">
          <SocketManager />
         <Canvas camera={{ position: [15, 15, 15], fov: 30 }} className="h-full">
        <color attach="background" args={["#ececec"]} />
        <Experience /> 
        </Canvas> 
  
     </div>)

   
}