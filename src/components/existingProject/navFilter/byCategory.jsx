import React, { useState } from 'react';
import { Input, Select } from 'antd';
import Grid from '@mui/material/Unstable_Grid2';
import { Container } from 'react-bootstrap';
import { Option } from 'rc-select'; // Import Option from rc-select

const FilterNav = ({ onFilterChange, categories, users, projects }) => {
  const [filterTitle, setFilterTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterProject, setFilterProject] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      title: filterTitle,
      category: filterCategory,
      user: filterUser,
      project: filterProject,
    });
  };

  const commonSelectStyle = { width: 200, marginRight: '2px' };
  const commonGridStyle = { flexGrow: 1, flexBasis: 0, maxWidth: '25%' };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid black',
    borderRadius: '4px',
    backgroundColor: 'white',
  };

  return (
    <Container style={{ maxWidth: '1200px'  }} className=''>
      <Grid container direction="row" justifyContent="flex-start"  spacing={1}>
        <Grid item style={commonGridStyle}>
          <Input
            style={inputStyle}
            placeholder="Filter by Title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            onPressEnter={handleFilterChange}
          />
        </Grid>
        <Grid item style={commonGridStyle}>
          <Select
            className="mr-2"
            placeholder="Filter by Category"
            style={inputStyle}
            value={filterCategory}
            onChange={(value) => setFilterCategory(value)}
            onSelect={handleFilterChange}
          >
            {categories?.map((category, index) => (
              <Option key={index} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Grid>
        <Grid item style={commonGridStyle}>
          <Select
            className="mr-2"
            placeholder="Filter by User"
            style={inputStyle}
            value={filterUser}
            onChange={(value) => setFilterUser(value)}
            onSelect={handleFilterChange}
          >
            {users?.map((user, index) => (
              <Option key={index} value={user}>
                {user}
              </Option>
            ))}
          </Select>
        </Grid>
        {projects.length > 0 && (
          <Grid item style={commonGridStyle}>
            <Select
              placeholder="Filter by Project"
              style={commonSelectStyle}
              value={filterProject}
              onChange={(value) => setFilterProject(value)}
              onSelect={handleFilterChange}
            >
              {projects?.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FilterNav;
