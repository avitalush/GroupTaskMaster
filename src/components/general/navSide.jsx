import React,{useContext, useEffect,useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import '../../style/generalStyle.css'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { ProjectContext } from '../../context/projectCOntext';
import Chat from '../chat/chat';
import { Container, Row, Col, Image } from 'react-bootstrap';


/*
import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Main from './Main';
*/



const drawerWidth = 240;
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`, // Apply a negative margin to shift content to the right when the Drawer is open
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function PersistentDrawerLeft() {
  const { findUserById ,currentId} = React.useContext(UserContext);
const [message,setMessage]=useState('')
  const { projects } = React.useContext(ProjectContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // New state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const openChat = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  }; 


const [isOpen,setIsOpen]=useState(false);
const [now, setNow] = useState(new Date());
  const navigate = useNavigate();
  const theme = useTheme();
   const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleFindById = (id) => {
   return findUserById(id)
  };

  const startChat = (user) => {
    console.log({user});
    setSelectedUser(user);
  };

  const showProjectDetails = (projectId) => {
    console.log(projectId);
    setSelectedProjectId(projectId);
    navigate(`project/${projectId.id}`);
    handleDrawerClose(); 

  };
  const handleAllProjects = () => {
    navigate(`/home`);
    handleDrawerClose(); 

  };
  const handleMyProject = () => {
    navigate(`project/000`);
    handleDrawerClose(); 

  };
  useEffect(() => {
    setIsOpen(projects.length > 0);
    console.log(currentId);
    if (now.getHours() >= 6 && now.getHours() < 12) {
      setMessage("Good morning ☀");
  } else if (now.getHours() >= 12 && now.getHours() < 16) {
      setMessage("Good afternoon🌞");
  } else if (now.getHours() >= 16 && now.getHours() < 18) {
      setMessage("Good afternoon⛅ ");
  } else {
      setMessage("Good night😴");
  }
  }, [projects]);
  

  return (
    <Box sx={{ display: 'flex' }} className="text-burgundy background-color p-0 m-0" >
      <CssBaseline />
      <AppBar position="fixed" open={open} className="container-fluid p-0 m-0 gx-0 center " >
        <Toolbar className="row align-items-center background-color2 " sx={{ height: '100%' }}>
       
          <Typography variant="h6" noWrap component="div" className='col-8 buttons text-burgundy2' >
          {isOpen===true && (
         
         <IconButton 
           color="inherit"
           aria-label="open drawer"
           onClick={handleDrawerOpen}
           edge="start"
           sx={{ mr: 2, p: 0, ...(open && { display: 'none' }) }}
         >
           <MenuIcon />
         </IconButton>
  
         
       )}
            <button onClick={() => { navigate("/register") }}   className="ms-md-3 text-burgundy2 background-color2 border-Style kalam-light">
              Sign up
            </button>
            <button onClick={() => { navigate("/login") }} className="ms-md-3 text-burgundy2 background-color2 border-Style kalam-light me-3">
              Sign in
            </button>
            
              {message}
            
            
          </Typography>
          <div className="col-3 logo" type="button">
                    <img src='../../images/TASK.png'  height="70" width="90" onClick={() => navigate("/")}  className='border-rudius'/>
                </div>
         </Toolbar>
      </AppBar>
    
      
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rlt' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem className='kalam-light text-burgundy'>
              <ListItemButton onClick={() => handleAllProjects()}>
                <ListItemText primary={"all projects"} className='kalam-bold ' style={{color:"#cc8686"}}/>
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton onClick={() => handleMyProject()}>
                <ListItemText primary={"my project"} className='kalam-bold ' style={{color:"#cc8686"}}/>
              </ListItemButton>
            </ListItem>
          {projects?.map((project, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => showProjectDetails(project)}>
                <ListItemText primary={project.name}  className='kalam-bold ' style={{color:"#cc8686"}}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       
        <ul className='kalam-bold text-burgundy'>
{/*   {selectedProjectId?.users?.map((user, index) => (
    
    
    <li key={index}>
      <button onClick={() => startChat({ id: user })}>
        {handleFindById(user)?.name}:
      </button>
    </li>
  ))} */}


{selectedProjectId?.users?.map((user, index) => {
    let userDetails = handleFindById(user);
    

    return (
        <li key={index} className='kalam-bold text-burgundy'>
            <button onClick={() => openChat(userDetails)}>
                {userDetails?.name}:
            </button>
        </li>
    );
})}

{/* {selectedProjectId?.users?.map((user, index) => {
    let userDetails = handleFindById(user);
    

    return (
        <li key={index}>
            <button onClick={() => startChat(userDetails)}>
                {userDetails?.name}:
            </button>
        </li>
    );
})} */}

   <li >
      <button onClick={() => openChat({ email: selectedProjectId?.admin, id: selectedProjectId?.admin })} className='kalam-bold text-burgundy'>
        {handleFindById(selectedProjectId?.admin)?.name}:
      </button>
    </li> 
{/*   {selectedUser && <Chat selectedUser={selectedUser} selectedProject={selectedProjectId.id}/>}
 */}
  {selectedUser && (
        <Chat
          selectedUser={selectedUser}
          selectedProject={selectedProjectId.id}
          isOpen={isChatOpen}
          handleClose={closeChat}
          className='kalam-bold text-burgundy'
        />
      )}
</ul>

   

      </Drawer>
     
      <Main open={open}>
        <DrawerHeader />

      </Main>
    </Box>
  );
}
