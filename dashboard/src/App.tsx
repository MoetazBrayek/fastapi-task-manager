import { useState } from 'react'
import { BrowserRouter, Routes , Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import Footer from './pages/footer'
import Header from './pages/header'
import LoginBox from './pages/login'
function App() {

  return (
    <>
          <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginBox} />
      </Routes>
    </BrowserRouter>



    </>
  )
}

export default App
