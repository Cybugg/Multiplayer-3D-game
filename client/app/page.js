"use client"
import Scene from "@/app/components/ThreeD/Scene"
import dynamic from "next/dynamic"

const GameScene = dynamic(()=>import("@/app/components/ThreeD/Scene"),{ssr:false})

export default function Home (){


  return( <>
  <Scene />
  </>)
}