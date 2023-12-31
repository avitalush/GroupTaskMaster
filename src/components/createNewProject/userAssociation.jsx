import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';

export default function UserAssociation() {


   const {users}=useContext(UserContext)

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [usersOfProject, setUsersOfProject] = useState([]);






    const handleAddUser = (e) => {
        setUsersOfProject([...usersOfProject, e.target.value])
    }




    


    return (
        <>
<input
      type="text"
      list="cars"
      value={searchTerm.includes("-new")?searchTerm.slice(0, -4):searchTerm}
      onChange={handleAddUser}
    />
    <datalist id="cars">
   
      {users.map((o,index)=>{
          return    <option key={index}>{o.email}</option>
      })}
           

    </datalist>
            <Button className='mt-3' onClick={handleAddUser}>add a people</Button>
            {usersOfProject?.map((user, i) => (
                <div key={i}>{user.email}</div>
            ))}

        </>

    )
}

