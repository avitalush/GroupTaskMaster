
import { TextField } from '@mui/material';
import React, { useState,useEffect,useContext } from 'react'
import BorderLinearProgress from "./BorderLinearProgress";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
 import { ChromePicker } from 'react-color';
import { UserContext } from '../../context/userContext';

const FormNeaProject = ({formData,setFormData }) => {
  const [text, setText] = useState(" ממליצים לך בחום להוסיף תיאור נרחב ");
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [count, setCount] = useState(0);
  const [color, setColor] = useState("grey");
    const [colorPicker, setColorPicker] = useState(formData.color); // Initial color
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const handleChangeColor = (newColor) => {
        setColorPicker(newColor.hex);
        setFormData((prevState) => ({ ...prevState, color: newColor.hex}));
        toggleColorPicker();

    };
    const handleChange = ( event ) => {
      const cnt = event.target.value.length;
      setCount(cnt);
      switch (true) {
          case cnt >= 1 && cnt < 30:
              setColor("red");
              setText("מרגיש לנו שהתיאור שכתבת קצר מידי");
              handleChangeValue(event)
              break;
          case cnt >= 30 && cnt < 50:
              setColor("orange");
              setText("יופי, התיאור הולך לכיוון הנכון");
              handleChangeValue(event)
              break;
          case cnt >= 50 && cnt < 100:
              setColor("yellow");
              setText("עוד ממש קצת וזה שם");
              handleChangeValue(event)
              break;
          case cnt >= 100 && cnt < 120:
              setColor("light-green");
              setText("אוטוטו");
              handleChangeValue(event)
              break;
          case cnt >= 150:
              setColor("green");
              setText("בול!");
              handleChangeValue(event)
              break;
          default:
              setColor("grey");
              setText(" ממליצים לך בחום להוסיף תיאור נרחב ");
              handleChangeValue(event);
                            break;
      }
  }
  const handleChangeValue=(event)=>{
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
   
      setOptions((prevOptions) => [...prevOptions, inputValue]);
      setInputValue('');
    
  };

  const handleAddOption = () => {
    setOptions((prevOptions) => [...prevOptions, inputValue]);
    setInputValue('');
    setFormData((prevState) => ({ ...prevState, categories: options }));

  };
   const toggleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const {usersList}=useContext(UserContext)
  useEffect(() => {
  }, []);
  

    return (
        <div className="p-5">
            <div className='row gx-0 justify-content-around'>
                <div className="col-md-6">
                    <label>שם הפרויקט</label> <br />
                    <TextField id="standard-basic" variant="standard"
                     name="name"
                                value={formData.name}
                                onChange={handleChangeValue} 
                                 />
                    <br /> <br />
                    <div>
                <h4>תיאור המשימה  (עד 150 תווים) {count}/150</h4>
                <span>{text}</span>
                <BorderLinearProgress
                    color1={color}
                    variant="determinate" value={count / 1.5} />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    variant='outlined'
                    multiline
                    minRows={7}
                    inputProps={{ maxLength: 500 }}
                    style={{ width: "32rem" }}
                    name='description'
                    label="תיאור"
                    onChange={handleChange}
                    defaultValue={formData ? formData.description : "זה המקום להוסיף תיאור כללי על הפרויקט"}
                />
            </div>
                    <br /> <br />
                    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">סוג לקיחת משימות:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="permissiontoAssociateTasks"
        value={formData.permissiontoAssociateTasks}
        onChange={handleChangeValue} 
        >
        <FormControlLabel value={true} control={<Radio />} label="בחירת משימות על ידי מנהל" />
        <FormControlLabel value={false} control={<Radio />} label="לקיחת משימות על ידי משתתפים" />
      </RadioGroup>
    </FormControl>
    
    <br /> <br />
    <div className="d-flex">
      <div>

      
      <input
        type="text"
        list="cars"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="Type here..."
      />
      <datalist id="cars">
        {options.map((o, index) => (
          <option key={index}>{o}</option>
        ))}
      </datalist>
      <button onClick={handleAddOption}>Add Option</button>
      </div>
      <div>
  {formData.categories.map((category, index) => (
    <p key={index}>{category}</p>
  ))}
</div>
    </div>
    <div>
    <button onClick={toggleColorPicker} style={{ color: formData.color }}>Toggle Color Picker - {formData.color}</button>

      {displayColorPicker && (
        <div>
          
          <ChromePicker color={formData.color} name="color" onChange={handleChangeColor}  />
          <p>Choose a color for your project: {formData.color}</p>
        </div>
      )}
    </div>
                </div>
                
            </div>
        </div>
    )
}

export default FormNeaProject;




