import React,{useState} from 'react';
import ColumTask from './colums/columnTask'
export default function ManagmentTasks() {
    const [listItems, setListItems] = useState([
        { id: 111, title: 'oooo',status:"ToDo" },
        { id: 2222, title: 'lllll',status:"inProgress" },
      ]);
    const listTitles=["ToDo","inProgress","Done","Error"]
  return (
    <div style={{display:"flex"}}>
     {listTitles.map((item, index) => (
   <ColumTask
     key={index}
     title={item}
     listItems={listItems.filter((l) => l.status === item)}
     setListItems={setListItems}
     droppableId={item} 
   />
))}

    
        

    </div>
  );
}
