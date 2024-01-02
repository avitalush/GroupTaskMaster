import { Delete } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';

export default function UserAssociation({setUsers}) {
  const { usersList } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleAddUser = (e) => {
    const selectedUser = usersList.find((user) => user.email === e.target.value);

    if (selectedUser) {
      setSearchTerm('');
      setSelectedUsers([...selectedUsers, selectedUser]);
      setUsers([...selectedUsers, selectedUser])
    }
  };

  const handleRemoveUser = (email) => {
    const updatedUsers = selectedUsers.filter((user) => user.email !== email);
    setSelectedUsers(updatedUsers);
    setUsers(updatedUsers)
  };

  return (
    <>
      <input
        type="text"
        list="cars"
        value={searchTerm.includes('-new') ? searchTerm.slice(0, -4) : searchTerm}
        onChange={handleAddUser}
      />
      <datalist id="cars">
        {usersList?.map((user, index) => (
          <option key={index}>{user.email}</option>
        ))}
      </datalist>

      <div>
        {selectedUsers.map((user, index) => (
          <div key={index}>
            {user.email}
            <Button variant="danger" onClick={() => handleRemoveUser(user.email)}>
              <Delete/>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
