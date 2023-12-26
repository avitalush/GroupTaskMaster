import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';

export default function UserAssociation() {


    const userEmail = [
        "avraham@gmail.com",
        "ytzchak@gmail.com",
        "yaakov@gmail.com",
        "sara@gmail.com", ,
        "rivka@gmail.com",
        "rachel@gmail.com",
        "lea@gmail.com",
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [usersOfProject, setUsersOfProject] = useState([]);




    const handleSearchChange = (event) => {

        const filteredData = userEmail.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const topFiveOptions = filteredData.slice(0, 5);

        setFilteredOptions(topFiveOptions);
        setSearchTerm(event.target.value);
    };


    const handleAddUser = (e) => {
        setUsersOfProject([...usersOfProject, searchTerm])
    }

    const handleOptionChange = (e) => {
        const selectedOption = e.target.value;
        setSearchTerm(selectedOption);
      };



    useEffect(() => {
        console.log(usersOfProject)

    }, []);


    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Add people to your project..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div>
                    {filteredOptions.map((option, index) => (
                        <option key={index} value={option} onClick={handleOptionChange}>
                            {option}
                        </option>
                    ))}
                </div>
 {/*                <select>
                    {filteredOptions.map((option, index) => (
                        <option key={index} value={option} onClick={handleOptionChange}>
                            {option}
                        </option>
                    ))}
                </select> */}

            </div>
            <Button className='mt-3' onClick={handleAddUser}>add a people</Button>
            {usersOfProject?.map((user, i) => (
                <div key={i}>{user}</div>
            ))}

        </>

    )
}

/*     useEffect(() => {
        const filteredData = userEmail.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const topFiveOptions = filteredData.slice(0, 5);

        setFilteredOptions(topFiveOptions);

    }, [searchTerm, userEmail]);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }; */