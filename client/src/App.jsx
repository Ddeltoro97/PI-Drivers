import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Detail from "./components/Detail/Detail"
import Create from './components/Create/Create'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path="" element={<LandingPage/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/driver/:id" element={<Detail/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
      </Routes>
    </div>
  
  )
}

export default App
