

import React from 'react'
import Home from './components/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route}from "react-router-dom"
import Navbar from './components/navbar/Navbar';
import Form from './components/form/Form';
import Viewlist from './components/Viewlist/Viewlist';

function App() {
  
  return (
    <div>

      <Navbar />

     <Routes>

      <Route element={<Home />} path='/' />
      <Route element={<Form />} path='newadd' />
      <Route element={<Viewlist />} path='/viewlist' />




     </Routes>




      
    </div>
  )
}

export default App
