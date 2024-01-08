import React,{useContext, useEffect,useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
      setMessage("בוקר טוב ☀");
  } else if (now.getHours() >= 12 && now.getHours() < 16) {
      setMessage("צהריים טובים 🌞");
  } else if (now.getHours() >= 16 && now.getHours() < 18) {
      setMessage("אחר הצהריים טובים⛅ ");
  } else {
      setMessage("לילה טוב 😴");
  }
  }, [projects]);
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="container-fluid p-0 m-0 gx-0 center" >
        <Toolbar className="row align-items-center ">
       
          <Typography variant="h6" noWrap component="div" className='col-8 buttons'>
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
            <button onClick={() => { navigate("/register") }}  style={{ backgroundColor: "blue" }} className="ms-md-3">
              הרשמה
            </button>
            <button onClick={() => { navigate("/login") }} style={{ backgroundColor: "blue" }} className="ms-md-3">
              התחברות
            </button>
            
            {message}
          </Typography>
          <div className="col-3 logo" type="button">
                    <img src='/images/logo.png' height="70" width="90" onClick={() => navigate("/")} />
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
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rlt' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem >
              <ListItemButton onClick={() => handleAllProjects()}>
                <ListItemText primary={"כל הפרויקטים"} />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton onClick={() => handleMyProject()}>
                <ListItemText primary={"הפרויקט שלי"} />
              </ListItemButton>
            </ListItem>
          {projects?.map((project, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => showProjectDetails(project)}>
                <ListItemText primary={project.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       
        <ul>
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
        <li key={index}>
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
    {selectedProjectId && (
        <li>
            {(() => {
                let adminDetails = handleFindById(selectedProjectId?.admin);
                return (
                    <button onClick={() => openChat(adminDetails)}>
                        {adminDetails?.name}:
                    </button>
                );
            })()}
        </li>
)}
   <li >
      <button onClick={() => openChat({ email: selectedProjectId?.admin, id: selectedProjectId?.admin })}>
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
