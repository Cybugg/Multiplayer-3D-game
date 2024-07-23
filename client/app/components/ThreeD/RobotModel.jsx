"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'

export function RobotModel({
    main= "grey",
    lining="#36454F",
    ...props}) {
  const group = useRef()
  const { scene, materials, animations } = useGLTF('/models/Robot.glb')
  
//   skinned meshes cannot be re-used without cloning them
  const clone = useMemo(()=>SkeletonUtils.clone(scene),[scene]);
  const { actions } = useAnimations(animations, group);
// useGraph creates two flat objct collectiond for nodes and materials
  const {nodes} = useGraph(clone);

  console.log(actions)
  const [animation, setAnimation] = useState("RobotArmature|Robot_Jump");
  useEffect(
    () => {
        actions[animation].reset().fadeIn(0.5).play();
        return () => {
            actions[animation].fadeOut(0.5)
        }

    }, [animation]
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="RobotArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.Bone} />
          </group>
          <group
            name="HandR"
            position={[-0.003, 2.37, -0.021]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}>
            <skinnedMesh
              name="HandR_1"
              geometry={nodes.HandR_1.geometry}
              material={materials.Main}
              skeleton={nodes.HandR_1.skeleton}
            >
                 <meshStandardMaterial color={main} />
            </skinnedMesh>
           
            <skinnedMesh
              name="HandR_2"
              geometry={nodes.HandR_2.geometry}
              material={materials.Grey}
              skeleton={nodes.HandR_2.skeleton}
            > <meshStandardMaterial color={lining} /> </skinnedMesh>
          </group>
          <group
            name="HandL"
            position={[-0.003, 2.37, -0.021]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}>
            <skinnedMesh
              name="HandL_1"
              geometry={nodes.HandL_1.geometry}
              material={materials.Main}
              skeleton={nodes.HandL_1.skeleton}
            ><meshStandardMaterial color={main} /></skinnedMesh>
            <skinnedMesh
              name="HandL_2"
              geometry={nodes.HandL_2.geometry}
              material={materials.Grey}
              skeleton={nodes.HandL_2.skeleton}
            ><meshStandardMaterial color={lining} /></skinnedMesh>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Robot.glb')

