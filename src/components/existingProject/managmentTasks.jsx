import React, { useState, useEffect, useContext } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Avatar, Image } from "antd";
import Modal from "react-modal";
import { Button } from 'react-bootstrap';
import { ProjectContext } from "../../context/projectCOntext";
import { useNavigate, useParams } from "react-router-dom";
import TaskDetails from "./user/showMoreUser";
import { UserContext } from "../../context/userContext";
import { Delete, Edit } from "@mui/icons-material";
import { TaskContext } from "../../context/taskContext";
import FilterNav from './navFilter/byCategory'
const labels = ["toDo", "inProgress", "done", "error"];
const labelsMap = {
  toDo: "To Do",
  inProgress: "In Progress",
  done: "Done",
  error: "Error",

};
const customStyles = {
  content: {

    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    minHeight: '80vh',
    minWidth: '40vw',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
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

function Kanban() {
  const { getTasksByIdProject, getProjectById, deleteTaskById } = useContext(ProjectContext);
  const { changeStatus, editTask } = useContext(TaskContext);
  const { findUserByEmail, currentId } = useContext(UserContext);
  const [project, setProject] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);  
  const { index } = useParams();

  useEffect(() => {
    console.log(currentId, project);
    if (currentId.id === project[0]?.admin) {
      setIsAdmin(true);
    }
  }, [isAdmin, project,index]);

  const [tasks, setTasks] = useState([
  ]);
  const navigate = useNavigate();
  const updateTask = (id, status) => {
    let t = tasks.find((t) => t.id === id);
    if (t.user === currentId.id || isAdmin) {
      const updatedTasks = tasks?.map((task) =>
        task._id === id ? { ...task, status } : task
      );
      changeStatus(id, status);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    }

  };

  const fetchData = async () => {
    const { data } = await getTasksByIdProject(index);

    setTasks(data.tasks);
    let current = getProjectById(index);
    setProject(current)
  };

  useEffect(() => {
    fetchData();
    console.log(project);
  }, [index]);
  const handleAddTask = () => {
    navigate(`/newtask/${project[0].id}`)
  }
  const handleFilterChange = ({ title, category, user }) => {
    console.log({title},{category},{user});
    const filtered = tasks.filter(task =>
      (!title || task.title.toLowerCase().includes(title.toLowerCase())) &&
      (!category || task.category === category) &&
      (!user || task.user === user)
    );

    setFilteredTasks(filtered);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <h1>{project[0]?.name}</h1>
      <h2>{project[0]?.description}</h2>
      <FilterNav onFilterChange={handleFilterChange} categories={project[0]?.categories} users={project[0]?.users}/>
      <section style={classes.board}>
      {labels.map((channel) => (
          <KanbanColumn key={channel} status={channel} tasks={filteredTasks} updateTask={updateTask} PROJECT={project[0]} isAdmin={isAdmin} />
        ))}
      </section>
{isAdmin&&
      <Button onClick={handleAddTask}>add task</Button>
}
    </DndProvider>
  );
}

function KanbanColumn({ status, tasks, updateTask, PROJECT,isAdmin }) {
  const [selectedid, setSelectedid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenShowMore, setIsModalShowMore] = useState(null);
  const { deleteTaskById, editTask } = useContext(TaskContext);
  const handleChangeStatus = (id) => {

  }
  const openidSelectionModal = () => {
    setIsModalOpen(true);
  };

  const closeidSelectionModal = () => {
    setIsModalOpen(false);
  };

  const openidSelectionModalShowMore = (task) => {
    setFormData(task)
    setIsModalShowMore(task);
  };

  const closeidSelectionModalShowMore = () => {
    console.log(formData);
    if(isAdmin){
    editTask(formData)

    }
    
    setIsModalShowMore(null);
  };
  const handleDeleteTask = (idTask) => {
    const { data } = deleteTaskById(idTask);
  };
  const handleidSelection = (id) => {
    setSelectedid(id);
    closeidSelectionModal();
  };

  const [formData, setFormData] = useState({});
  const updateFormData = (newFormData) => {
    setFormData(newFormData);
  
  };
  const [, drop] = useDrop({
    accept: "kanbanItem",
    drop: (item) => updateTask(item.id, status),
  });


  return (
    <div ref={drop} style={classes.column}>
      <div style={classes.columnHead}>{labelsMap[status]}</div>
      <div>
        {tasks && Array.isArray(tasks) && tasks
          .filter((item) => item.status === status)
          .map((item) => (

            <KanbanItem key={item._id} id={item._id}>
              <div style={classes.container} >

                <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                  <div>{item.title}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
                  <Avatar src={item.user ? item.user : "https://joesch.moe/api/v1/random?key=" + item.user} />

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
                    <button style={classes.Icons}>
                      <Delete onClick={() => handleDeleteTask(item.id)} />
                    </button>
                    <button style={classes.Icons}>
                      <Edit onClick={() => openidSelectionModalShowMore(item)} />
                    </button>
                  </div>

                </div>
              </div>
            </KanbanItem>
          ))}

      </div>
      <Modal
        isOpen={isModalOpenShowMore !== null}
        onRequestClose={closeidSelectionModalShowMore}
        style={customStyles}
      >
        <TaskDetails task={isModalOpenShowMore} project={PROJECT} updateFormData={updateFormData} formData={formData} isAdmin={isAdmin} />

        <button onClick={closeidSelectionModalShowMore}>סגור</button>
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
