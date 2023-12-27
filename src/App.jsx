import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormNeaProject from './components/createNewProject/form'
import ManagmentNewProject from './components/createNewProject/managmentNewProject'
import ShowAllProjcts from './components/home/showAllProjcts';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderUser from './context/userConrext';
import ProviderProjec from './context/projectCOntext';
import Kanban from './components/existingProject/managmentTasks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SwipeableTemporaryDrawer from './components/general/navSide'
import { Main } from './components/general/mainSide'
import Login from './components/users/login/logIn'


function App() {

  return (
   <>
   </>
    
  )
}

export default App
