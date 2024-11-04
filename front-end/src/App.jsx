import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Create from "./create"
import Update from './update'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/update/:id' element={<Update/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App