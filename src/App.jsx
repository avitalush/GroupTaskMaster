import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KanbanBoard from './components/existingProject/colums/KanbanBoard'
import FormNeaProject from './components/createNewProject/form'
import ManagmentNewProject from './components/createNewProject/managmentNewProject'
import ShowAllProjcts from './components/home/showAllProjcts';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderUser from './context/userConrext';
import ProviderProjec from './context/projectCOntext';
import BrowserRouter from 

function App() {

  return (
    <ProviderProjec>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Main><ShowAllProjcts /></Main>}></Route>
          <Route path='/project/:index' element={<Main><Kanban /></Main>}></Route>
          <Route path='/newproject' element={<ManagmentNewProject />}></Route>

        </Routes>
      </BrowserRouter>

    </ProviderProjec>
  )
}

export default App
