"use client"
import dynamic from "next/dynamic"

const GameScene = dynamic(()=>import("@/app/components/ThreeD/Scene"),{ssr:false})

export default function Home (){


  return( <>
  <GameScene />
  </>)
}