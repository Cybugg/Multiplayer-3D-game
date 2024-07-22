import { OrbitControls } from "@react-three/drei";
import { RobotModel } from "./AnimatedRobot";
import { Suspense } from "react";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <Suspense >
          <RobotModel />     
        </Suspense>
          
      </mesh>
    </>
  );
};
