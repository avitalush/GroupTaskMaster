// FilterNav.jsx

import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

const FilterNav = ({ onFilterChange,categories,users }) => {
  const [filterTitle, setFilterTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterUser, setFilterUser] = useState('');


  const handleFilterChange = () => {
    onFilterChange({
      title: filterTitle,
      category: filterCategory,
      user: filterUser,
    });
  };

  return (
    <div className="d-flex">
      <Input
      className="w-20"
        placeholder="Filter by Title"
        value={filterTitle}
        onChange={(e) => setFilterTitle(e.target.value)}
        onPressEnter={handleFilterChange}
      />
      <Select
        placeholder="Filter by Category"
        style={{ width: 200, margin: '10px 0' }}
        value={filterCategory}
        onChange={(value) => setFilterCategory(value)}
        onSelect={handleFilterChange}
      >
       {categories?.map((category, index) => (
        <Option key={index} value={category} >
          {category}
        </Option>
      ))}
      </Select>
      <Select
        placeholder="Filter by User"
        style={{ width: 200, margin: '10px 0' }}
        value={filterUser}
        onChange={(value) => setFilterUser(value)}
        onSelect={handleFilterChange}
      >
         {users?.map((category, index) => (
        <Option key={index} value={category} >
          {category}
        </Option>
      ))}
      </Select>
    </div>
  );
};
export default FilterNav;
