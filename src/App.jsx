import { useState } from 'react'
import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import  Dashboard  from './Pages/Dashboard'
import  DetailPage  from './Pages/DetailPage'



function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/details/:id" element={<DetailPage/>}></Route>
      </Routes>
      </BrowserRouter>

   
    </>
  )
}

export default App
