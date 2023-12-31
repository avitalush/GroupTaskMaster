import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormNeaProject from './components/createNewProject/form'
import ManagmentNewProject from './components/createNewProject/managmentNewProject'
import ShowAllProjcts from './components/home/showAllProjcts';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderUser from './context/userContext';
import ProviderProjec from './context/projectCOntext';
import Kanban from './components/existingProject/managmentTasks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SwipeableTemporaryDrawer from './components/general/navSide'
import { Main } from './components/general/mainSide'
import Login from './components/users/login/logIn'
import AddUser from './components/users/addUser'
import { Home } from '@mui/icons-material'
import ProviderTask from './context/taskContext'
import DynamicSelect from './components/existingProject/navFilter/byUser'
import NewTask from './components/general/newTask'


function App() {

  return (
    <ProviderUser>
     <ProviderProjec>
       <ProviderTask>
     <BrowserRouter>
          <SwipeableTemporaryDrawer />
   <Routes> 
   <Route path='/home' element={<ShowAllProjcts/>}></Route>
   <Route path='/login' element={<Login/>}></Route>

      <Route path='/register' element={<Main><AddUser/></Main>}></Route>
     <Route path='/project/:index' element={<Main><Kanban/></Main>}></Route>
       <Route path='/newproject' element={<ManagmentNewProject/>}></Route>
       <Route path='/newtask/:idproject' element={<NewTask/>}></Route>

    </Routes>
     </BrowserRouter> 
     </ProviderTask>
   </ProviderProjec> 
   </ProviderUser>
  )
}

export default App
