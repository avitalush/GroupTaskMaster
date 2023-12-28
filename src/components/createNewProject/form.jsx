// import React, { useEffect, useState } from 'react'
// import { Form, Button } from 'react-bootstrap';
// import UserAssociation from './userAssociation';
// import CreateCategory from './createCategory';
// import { ChromePicker } from 'react-color';





// export default function FormNeaProject() {


//     const [color, setColor] = useState('#ffffff'); // Initial color

//     const handleChange = (newColor) => {
//         setColor(newColor.hex);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Form submitted:', formData);
//     };


//     return (



//         <Form onSubmit={handleSubmit}>


//             <Form.Group controlId="formFirstName">
//                 <Form.Label>Project Name: </Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter name of your project "
//                     name="projectName"
//                 // value={formData.firstName}
//                 //onChange={handleChange}
//                 />

//                 <div>
//                     <h2>Color Picker</h2>
//                     <ChromePicker color={color} onChange={handleChange} />
//                     <p>Choose a color for your project: {color}</p>
//                 </div>

//             </Form.Group>
            
          
//             <CreateCategory></CreateCategory>
//             <Button variant="primary" type="submit">
//                 Submit
//             </Button>
//         </Form>
//     )
// }
import { TextField } from '@mui/material';
import React, { useState } from 'react'
import BorderLinearProgress from "./BorderLinearProgress";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
 import { ChromePicker } from 'react-color';

const FormNeaProject = ({ setName, setBuildId,setDescription,formData,setPermissiontoAssociateTasks }) => {
  const [text, setText] = useState(" ממליצים לך בחום להוסיף תיאור נרחב ");

  const [count, setCount] = useState(0);
  const [color, setColor] = useState("grey");
    const [colorPicker, setColorPicker] = useState('#ffffff'); // Initial color
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const handleChangeColor = (newColor) => {
        setColorPicker(newColor.hex);
    };
    const handleChange = ({ target }) => {
      const cnt = target.value.length;
      setCount(cnt);
      switch (true) {
          case cnt >= 1 && cnt < 30:
              setColor("red");
              setText("מרגיש לנו שהתיאור שכתבת קצר מידי");
              setDescription(cnt)
              break;
          case cnt >= 30 && cnt < 50:
              setColor("orange");
              setText("יופי, התיאור הולך לכיוון הנכון");
              setDescription(cnt)

              break;
          case cnt >= 50 && cnt < 100:
              setColor("yellow");
              setText("עוד ממש קצת וזה שם");
              setDescription(cnt)

              break;
          case cnt >= 100 && cnt < 120:
              setColor("light-green");
              setText("אוטוטו");
              setDescription(cnt)

              break;
          case cnt >= 150:
              setColor("green");
              setText("בול!");
              setDescription(cnt)

              break;
          default:
              setColor("grey");
              setText(" ממליצים לך בחום להוסיף תיאור נרחב ");
              setDescription(cnt)
              break;
      }
  }
   const toggleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

    return (
        <div className="p-5">
            <div className='row gx-0 justify-content-around'>
                <div className="col-md-6">
                    <label>שם הפרויקט</label> <br />
                    <TextField id="standard-basic" variant="standard" onChange={({ target }) => setName(target.value)} />
                    <br /> <br />
                    <label>תיאור הפרויקט</label> <br />
                    <div>
                <h4>פרטים נוספים (עד 150 תווים) {count}/150</h4>
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
                    label="תיאור"
                    onChange={handleChange}
                    defaultValue={formData ? formData.description : "זה המקום להוסיף תיאור כללי על הפרויקט"}
                />
            </div>
                    <br /> <br />
                    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">סוג תשלום:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={true}
        onChange={({ target }) => setPermissiontoAssociateTasks(target.value)} 
              >
        <FormControlLabel value={true} control={<Radio />} label="בחירת משימות על ידי מנהל" />
        <FormControlLabel value={false} control={<Radio />} label="לקיחת משימות על ידי משתתפים" />
      </RadioGroup>
    </FormControl>
    <div>
      <button onClick={toggleColorPicker}>Toggle Color Picker</button>

      {displayColorPicker && (
        <div>
          <h2>Color Picker</h2>
          <ChromePicker color={colorPicker}  onChange={({ target }) => setColorProject(target.value.hex),handleChangeColor(target.value)}  />
          <p>Choose a color for your project: {colorPicker}</p>
        </div>
      )}
    </div>
                </div>
                
            </div>
        </div>
    )
}

export default FormNeaProject;




