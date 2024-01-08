import React,{useContext,useEffect} from 'react'
import { TaskContext } from '../../context/taskContext';
import NewTask from '../general/newTask'

export default function CreateTasksList({idProject}) {
    const { tasks } = useContext(TaskContext);
    
    useEffect(() => {
     console.log(idProject);
    }, []);
    
  return (
    <div className="d-flex mx-auto pt-5 container center form">
        <ul className="form">

        {tasks?.map((task, index) => {
    return <li key={index}>{task.title}</li>;
})}
</ul>
{console.log(tasks)}
      <NewTask idProject={idProject} isDashbord={false}  />
    </div>
  )
}
