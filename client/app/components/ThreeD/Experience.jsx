"use client"
import { ContactShadows, Environment, Html, OrbitControls } from "@react-three/drei";
import {RobotModel} from "./RobotModel"
import { Suspense } from "react";
import { AmbientLight } from "three";

export const Experience = () => {
    return (
      <>
        <OrbitControls />
        <ContactShadows blur={2} />
        <Environment preset="sunset" />
        <ambientLight intensity={0.3} />
          <mesh>
            <Suspense fallback={<Html><div className="text-black text-center">Loading ...</div></Html>}>
                 {/* <RobotModel /> */}
                 <RobotModel main="brown" position-x={-5} />
            </Suspense>
         
          </mesh>
      </>
    );
  };

  