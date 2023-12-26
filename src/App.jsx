import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KanbanBoard from './components/existingProject/colums/KanbanBoard'


function App() {

  return (
    <div className="App">
    <KanbanBoard />
  </div>
  )
}

export default App
