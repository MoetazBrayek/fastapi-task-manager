import { useState } from 'react'
import { BrowserRouter, Routes , Route } from "react-router-dom";
import LoginBox from './pages/login'
import Home from './pages/home';
function App() {

  return (
    <>
          <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginBox} />
        <Route path="/home" Component={Home} />
      </Routes>
    </BrowserRouter>



    </>
  )
}

export default App
