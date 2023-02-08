import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MyPageMain() {
  return (
      <main
        style={{
          display : "flex",
          flex : "auto",
          marginBottom : "15px",
          padding : "20px",
          border : "1px solid lightgray"
        }}
      >
        <Outlet/>
      </main>
  )
}