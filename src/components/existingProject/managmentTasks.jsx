import React, { useState, useEffect, useContext } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Avatar } from "antd";
// import { Modal } from "antd";
import { Modal } from "@mui/material";

import { Button } from 'react-bootstrap';
import { ProjectContext } from "../../context/projectCOntext";
import { useNavigate, useParams } from "react-router-dom";
import TaskDetails from "./user/showMoreUser";
import { UserContext } from "../../context/userContext";
import { Delete, Edit } from "@mui/icons-material";
import { TaskContext } from "../../context/taskContext";
import FilterNav from './navFilter/byCategory';
import ChartComponent from "./admin/graph";

const labels = ["toDo", "inProgress", "done", "error"];
const labelsMap = {
  toDo: "To Do",
  inProgress: "In Progress",
  done: "Done",
  error: "Error",
};

const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  danger: '#e74c3c',
  lightGray: '#ebe6e6',
  darkGray: '#ada2a2',
  red: '#f00909',
  green: '#2ecc71',
  blue: '#3498db',
  yellow: '#f39c12',
};

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    padding: '20px',
    minWidth: '300px',
    maxWidth: '60%',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
};

const classes = {
  button: {
    padding: '8px',
    borderRadius: '4px',
    margin: '4px',
    cursor: 'pointer',
    color: '#fff',
  },
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',

  },
  column: {
    borderRadius: "2.5px",
    width: "300px",
    height: "475px",
    overflowY: "scroll",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    border: "1px solid gray",
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#000',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#333',
      borderRadius: '10px',
    },
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "#fff",
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
    backgroundColor: colors.lightGray,
    boxShadow: "10px 5px 5px black",
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
  const { getTasksByIdProject, getProjectById, projects, getDatatToGraph } = useContext(ProjectContext);
  const { changeStatus, editTask } = useContext(TaskContext);
  const { getAllTasksByIdUser, currentId } = useContext(UserContext);
  const [project, setProject] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [tasks, setTasks] = useState([
  ]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const { index } = useParams();
  const [start, setStart] = useState(false)
  useEffect(() => {
    console.log({ currentId, project });
    //  console.log(index!=="000"&&currentId?.id === project?.admin)
    if (index !== "000" && currentId?._id === project?.admin) {
      setIsAdmin(true);
    }
  }, [currentId, project, index]);


  const navigate = useNavigate();
  const updateTask = (id, status) => {
    console.log(status);
    let t = tasks.find((t) => t.id === id);
    if (t.user === currentId.id || isAdmin) {
      const updatedTasks = filteredTasks?.map((task) =>
        task._id === id ? { ...task, status } : task
      );
      changeStatus(id, status);
      setTasks(updatedTasks);
      console.log({ updatedTasks });

      setFilteredTasks(updatedTasks);
    }

  };

  const fetchData = async () => {
    if (index === "000") {
      const d = await getAllTasksByIdUser();
      console.log(d);

      const uniqueCategories = Array.from(
        new Set(
          d.data.tasks?.reduce((acc, task) => {
            return acc.concat(task?.categories);
          }, [])
        )
      );
      setTasks(d.data.tasks);
      setFilteredTasks(d.data.tasks);

      setProject({
        tasks: d.data.tasks,
        categories: uniqueCategories,
        users: [],
        name: "My Project",
        description: "ALL MY TASKS",
        date_created: new Date(),
        id: "000",
        admin: currentId.id,
        color: "yellow",
        permissiontoAssociateTasks: "tasks"
      })
    }
    else {
      const { data } = await getTasksByIdProject(index);
      console.log(data.tasks[0]);
      setTasks(data.tasks);
      setFilteredTasks(data.tasks)
      let current = getProjectById(index);
      setProject(current[0])
      console.log(current[0]);

    }
    console.log(isAdmin);

  };
  useEffect(() => {
    (async () => {
      if (isAdmin) {
        const { data } = await getDatatToGraph(index);
        console.log(data);
        setGraphData(data.objectsArray)

      }
    })();
  }, [isAdmin])
  useEffect(() => {
    fetchData();

    setStart(true)
  }, [index]);
  const handleAddTask = () => {
    navigate(`/newtask/${project.id}`)
  }
  const handleFilterChange = ({ title, category, user, project }) => {

    setStart(false)
    console.log({ title }, { category }, { user });
    const filtered = tasks.filter(task =>
      (!title || task.title.toLowerCase().includes(title.toLowerCase())) &&
      (!category || task.category === category) &&
      (!user || task.user === user) &&
      (!project || task.project === project)
    );

    setFilteredTasks(filtered);
  };
  //   const graphData=[
  //     {
  //         "date": "2024-01-01",
  //         "all": 3,
  //         "creates": 3,
  //         "progresses": 0,
  //         "errors": 0,
  //         "dones": 0
  //     },
  //     {
  //         "date": "2024-01-02",
  //         "all": 3,
  //         "creates": 0,
  //         "progresses": 1,
  //         "errors": 0,
  //         "dones": 0
  //     },
  //     {
  //         "date": "2024-01-03",
  //         "all": 8,
  //         "creates": 4,
  //         "progresses": 3,
  //         "errors": 0,
  //         "dones": 0
  //     },
  //     {
  //         "date": "2024-01-04",
  //         "all": 8,
  //         "creates": 0,
  //         "progresses": 4,
  //         "errors": 0,
  //         "dones": 0
  //     },
  //     {
  //         "date": "2024-01-05",
  //         "all": 8,
  //         "creates": 0,
  //         "progresses": 6,
  //         "errors": 0,
  //         "dones": 0
  //     },
  //     {
  //         "date": "2024-01-06",
  //         "all": 8,
  //         "creates": 0,
  //         "progresses": 5,
  //         "errors": 0,
  //         "dones": 1
  //     },
  //     {
  //         "date": "2024-01-07",
  //         "all": 8,
  //         "creates": 0,
  //         "progresses": 4,
  //         "errors": 1,
  //         "dones": 2
  //     }
  // ]
  return (
    <DndProvider backend={HTML5Backend} style={{ backgroundColor: "black" }}>
      {isAdmin && <ChartComponent data={graphData} />}
      <h1 style={{ textAlign: 'center', color: colors.darkGray }}>Kanban Board</h1>
      <h2 style={{ textAlign: 'center', color: colors.darkGray }}>{project.name}</h2>
      <FilterNav onFilterChange={handleFilterChange} categories={project.categories} users={project.users} projects={project.id === "000" ? projects : []} />
      <section style={classes.board}>
        {labels.map((channel, index) => (
          <KanbanColumn key={channel} status={channel} tasks={start ? tasks : filteredTasks} updateTask={updateTask} PROJECT={project} isAdmin={isAdmin} colors={colors} index={index} />
        ))}
      </section>
      {isAdmin &&
        <Button style={classes.button} onClick={handleAddTask} variant="primary">Add Task</Button>
      }
    </DndProvider>
  );

}

function KanbanColumn({ status, tasks, updateTask, PROJECT, isAdmin, colors, index }) {
  const [selectedid, setSelectedid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenShowMore, setIsModalShowMore] = useState(null);
  const { deleteTaskById, editTask } = useContext(TaskContext);
  const { getProjectById } = useContext(ProjectContext);

  const openidSelectionModal = () => {
    setIsModalOpen(true);
  };

  const closeidSelectionModal = () => {
    setIsModalOpen(false);
  };

  const openidSelectionModalShowMore = (task) => {
    console.log({ task });
    setFormData(task)
    setIsModalShowMore(task);
  };

  const closeidSelectionModalShowMore = () => {
    console.log(formData);
    if (isAdmin) {
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
  const getNameProject = (id) => {
    let current = getProjectById(id);

    return current[0];
  }
  const columnStyle = index === 0
    ? {
      ...classes.column,
      borderColor: colors.darkGray,
      background: 'linear-gradient(3deg, rgba(0,0,0,1) 9%, rgba(52,152,219,1) 70%, rgba(185,234,255,1) 100%)',
    }
    : index === 1
      ? {
        ...classes.column,
        borderColor: colors.darkGray,
        background: 'linear-gradient(36deg, rgba(0,0,0,1) 9%, rgba(46,204,113,1) 70%, rgba(255,252,252,1) 100%)',
      }
      : index === 2
        ? {
          ...classes.column,
          borderColor: colors.darkGray,
          background: 'linear-gradient(5deg, rgba(0,0,0,1) 9%, rgba(240,9,9,1) 70%, rgba(255,255,255,1) 100%)',
        }
        : {
          ...classes.column,
          borderColor: colors.darkGray,
          background: 'linear-gradient(5deg, rgba(0,0,0,1) 9%, rgba(173,162,162,1) 70%, rgba(255,255,255,1) 100%)',
        };


  return (
    <div ref={drop} style={columnStyle}>
      <div style={{ ...classes.columnHead, backgroundColor: index === 0 ? colors.blue : index === 1 ? colors.green : index === 2 ? colors.red : colors.darkGray }}>{labelsMap[status]}</div>      <div>
        {tasks && Array.isArray(tasks) && tasks
          .filter((item) => item.status === status)
          .map((item) => (


            <KanbanItem key={item._id} id={item._id} colors={colors} style={{ backgroundColor: "red" }}>

              <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                <div>{item.title}</div>
              </div>
              {PROJECT.id === "000" && <b>{getNameProject(item.project).name}</b>}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
                <Avatar src={item.user ? item.user.pic?item.user.pic: "https://joesch.moe/api/v1/random?key=" + item.user: "https://joesch.moe/api/v1/random?key=" + item.user} />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
                  {PROJECT.id !== "000" && (<button style={classes.Icons}>
                    <Delete onClick={() => handleDeleteTask(item.id)} />
                  </button>)}
                  <button style={classes.Icons}>
                    <Edit onClick={() => openidSelectionModalShowMore(item)} />
                  </button>
                </div>

              </div>
            </KanbanItem>

          ))}
      </div>
      <Modal
        isOpen={true}
        open={isModalOpenShowMore !== null}
        onRequestClose={closeidSelectionModalShowMore}
        style={customStyles}
      >
        <>
          <TaskDetails task={isModalOpenShowMore} project={PROJECT} updateFormData={updateFormData} formData={formData} isAdmin={isAdmin} />

          <button onClick={closeidSelectionModalShowMore}>סגור</button></>
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
    <div ref={drag} style={{ ...classes.item, opacity: isDragging ? 0.5 : 1, ...classes.container }}>
      {children}
    </div>

  );
}

export default Kanban;
