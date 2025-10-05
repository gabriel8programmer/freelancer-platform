// App.jsx
import React, { useState } from 'react'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import FreelancersPage from './pages/FreelancersPage/FreelancersPage'
import PostProjectPage from './pages/PostProjectPage/PostProjectPage'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />
      case 'projects':
        return <ProjectsPage />
      case 'freelancers':
        return <FreelancersPage />
      case 'post':
        return <PostProjectPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App