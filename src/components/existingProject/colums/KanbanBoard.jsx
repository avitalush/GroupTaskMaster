import React,{useState} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Avatar, Image } from "antd";
import Modal from "react-modal";
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

function Kanban() {
  const [tasks, setTasks] = React.useState([
    { _id: 1, title: "First Task", status: "toDo" ,user:"0"},
    { _id: 2, title: "Second Task", status: "toDo",user:"1"},
    { _id: 3, title: "Third Task", status: "toDo",user:"2"},
    { _id: 4, title: "Fourth Task", status: "toDo",user:"3"},
    { _id: 5, title: "Fifth Task", status: "toDo",user:"4"},
    { _id: 6, title: "Sixth Task", status: "toDo",user:"5"},
    { _id: 7, title: "Seventh Task", status: "toDo",user:"6"},
    { _id: 8, title: "Eighth Task", status: "toDo",user:"7"},
    { _id: 9, title: "Ninth Task", status: "toDo",user:"8"},
    { _id: 10, title: "Tenth Task", status: "toDo",user:"9"},
  ]);

  const updateTask = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        <header className="header">Example Kanban Board </header>
        <section style={classes.board}>
          {labels.map((channel) => (
            <KanbanColumn key={channel} status={channel} tasks={tasks} updateTask={updateTask} />
          ))}
        </section>
      </main>
    </DndProvider>
  );
}

function KanbanColumn({ status, tasks, updateTask }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openUserSelectionModal = () => {
    setIsModalOpen(true);
  };

  const closeUserSelectionModal = () => {
    setIsModalOpen(false);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    closeUserSelectionModal();
  };

  const users = [
    // הוסף כאן את המשתמשים מהרשימה שלך
    { id: 1, name: "User 1", avatar: "url_to_avatar" },
    { id: 2, name: "User 2", avatar: "url_to_avatar" },
    // ...
  ];
  const [, drop] = useDrop({
    accept: "kanbanItem",
    drop: (item) => updateTask(item.id, status),
  });
  const handleClick = (idTask) => {
    const updatedTasks = tasks.map((task) =>
      task._id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };
 
  return (
    <div ref={drop} style={classes.column}>
      <div style={classes.columnHead}>{labelsMap[status]}</div>
      <div>
      {tasks
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
          <button style={classes.Icons} onClick={openUserSelectionModal}>
            <Avatar src={selectedUser ? selectedUser.avatar : "https://joesch.moe/api/v1/random?key=" + item.user} />
          </button>
        </div>
      </div>
    </KanbanItem>
  ))}

      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeUserSelectionModal}>
        <h2>Select User</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserSelection(user)}>
              {user.name}
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
