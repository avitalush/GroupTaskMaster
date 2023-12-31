import React,{useState,useEffect, useContext} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Avatar, Image } from "antd";
import Modal from "react-modal";
import { Button } from 'react-bootstrap';
import { ProjectContext } from "../../context/projectCOntext";
import { useNavigate, useParams } from "react-router-dom";

const labels = ["toDo", "inProgress", "done", "error"];

const labelsMap = {
  toDo: "To Do",
  inProgress: "In Progress",
  done: "Done",
  error: "Error",
 
};

const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  column: {
    backgroundColor: "#f4f5f7",
    borderRadius: "2.5px",
    width: "300px",
    height: "475px",
    overflowY: "scroll",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    border: "1px solid gray",
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#7F8C8D",
    color: "white",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white",
  },
  container: {
    borderRadius: '10px',
    padding: '8px',
    color: '#000',
    marginBottom: '8px',
    minHeight: '90px',
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: 'red',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  Icons: {
    display: 'flex',
    justifyContent: 'end',
    padding: '2px',
  },

};
function Main({ children, open }) {
  return (
    <main
      style={{
        flexGrow: 1,
        padding: "20px", // Adjust padding as needed
        marginLeft: open ? "200" : "0",
        transition: "margin 0.3s",
      }}
    >
      {children}
    </main>
  );
}
function Kanban() {
  const { getTasksByIdProject,getProjectById} = useContext(ProjectContext);
const [project,setProject]=useState({});
  const [tasks, setTasks] = useState([
    { _id: 1, title: "First Task", status: "toDo" ,id:"0"},
    { _id: 2, title: "Second Task", status: "toDo",id:"1"},
    { _id: 3, title: "Third Task", status: "toDo",id:"2"},
    { _id: 4, title: "Fourth Task", status: "toDo",id:"3"},
    { _id: 5, title: "Fifth Task", status: "toDo",id:"4"},
    { _id: 6, title: "Sixth Task", status: "toDo",id:"5"},
    { _id: 7, title: "Seventh Task", status: "toDo",id:"6"},
    { _id: 8, title: "Eighth Task", status: "toDo",id:"7"},
    { _id: 9, title: "Ninth Task", status: "toDo",id:"8"},
    { _id: 10, title: "Tenth Task", status: "toDo",id:"9"},
  ]);
const {index}=useParams();
const navigate=useNavigate();
  const updateTask = (id, status) => {
    const updatedTasks = tasks?.map((task) =>
      task._id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const fetchData = async () => {
    const { data } = await getTasksByIdProject(index);
  
    setTasks(data.tasks);
let current=getProjectById(index);
setProject(current)
console.log(current);
  };

  useEffect(() => {
    fetchData();
    console.log(project.name);
  }, []); 
const handleAddTask=()=>{
  navigate(`/newtask/${project.id}`)
}
  return (
    <DndProvider backend={HTML5Backend}>
      <h1>{project[0]?.name}</h1>
      <h2>{project[0]?.description}</h2>
        <section style={classes.board}>
          {labels.map((channel) => (
            <KanbanColumn key={channel} status={channel} tasks={tasks} updateTask={updateTask} />
          ))}
        </section>
       
      <Button onClick={handleAddTask}>add task</Button>

    </DndProvider>
  );
}

function KanbanColumn({ status, tasks, updateTask }) {
  const [selectedid, setSelectedid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openidSelectionModal = () => {
    setIsModalOpen(true);
  };

  const closeidSelectionModal = () => {
    setIsModalOpen(false);
  };

  const handleidSelection = (id) => {
    setSelectedid(id);
    closeidSelectionModal();
  };

  const ids = [
    // הוסף כאן את המשתמשים מהרשימה שלך
    { id: 1, name: "id 1", avatar: "url_to_avatar" },
    { id: 2, name: "id 2", avatar: "url_to_avatar" },
    // ...
  ];
  const [, drop] = useDrop({
    accept: "kanbanItem",
    drop: (item) => updateTask(item.id, status),
  });
  const handleClick = (idTask) => {
    const updatedTasks = tasks?.map((task) =>
      task._id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };
 
  return (
    <div ref={drop} style={classes.column}>
      <div style={classes.columnHead}>{labelsMap[status]}</div>
      <div>
      {tasks && Array.isArray(tasks) && tasks
  .filter((item) => item.status === status)
  .map((item) => (
    
    <KanbanItem key={item._id} id={item._id}>
      <div style={classes.container}>
        <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
          <span>
            <small>
              #{item._id}
            </small>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <div>{item.title}</div>
        </div>
        <div>
          <button style={classes.Icons} onClick={openidSelectionModal}>
            <Avatar src={selectedid ? selectedid.avatar : "https://joesch.moe/api/v1/random?key=" + item.id} />
          </button>
        </div>
      </div>
      </KanbanItem>
  ))}

      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeidSelectionModal}>
        <h2>Select id</h2>
        <ul>
          {ids.map((id) => (
            <li key={id.id} onClick={() => handleidSelection(id)}>
              {id.name}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

function KanbanItem({ id, children }) {
  const [{ isDragging }, drag] = useDrag({
    type: "kanbanItem", 
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ ...classes.item, opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
}

export default Kanban;
