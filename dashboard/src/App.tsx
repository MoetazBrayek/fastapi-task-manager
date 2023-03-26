import { useState } from 'react'
import { BrowserRouter, Routes , Route } from "react-router-dom";
import LoginBox from './pages/login'
import Home from './pages/home';
import TasksPage from './pages/tasks';
import NewsPage from './pages/news';
import RankingPage from './pages/rank';
import RoadmapPage from './pages/raodmap';
import WikiPage from './pages/wiki';
function App() {

  return (
    <>
          <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginBox} />
        <Route path="/home" Component={Home} />
        <Route path="/tasks" Component={TasksPage} />
        <Route path="/news" Component={NewsPage} />
        <Route path="/ranking" Component={RankingPage} />
        <Route path="/roadmap" Component={RoadmapPage} />
        <Route path="/wiki" Component={WikiPage} />
      </Routes>
    </BrowserRouter>



    </>
  )
}

export default App
