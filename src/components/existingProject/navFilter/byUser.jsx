import React, { useState } from 'react';

const DynamicSelect = () => {
  const [options, setOptions] = useState(["lllll","oooo","pioip","fffu"]);
  const [inputValue, setInputValue] = useState('');


  return (
    <div>
    <input
      type="text"
      list="cars"
      value={inputValue.includes("-new")?inputValue.slice(0, -4):inputValue}
      onChange={(e)=>setInputValue(e.target.value)}
    />
    <datalist id="cars">
   
      {options.map((o,index)=>{
          return    <option key={index}>{o}</option>
      })}
            <option>{inputValue}</option>

    </datalist>

    <p>Selected Car: {inputValue}</p>
  </div>
  );
};

export default DynamicSelect;
