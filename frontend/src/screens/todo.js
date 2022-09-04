import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Button from '@mui/material/Button';
import ClearAllSharpIcon from '@mui/icons-material/ClearAllSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

function Todo() {
    const [todoData,setTodoData] = useState("");
    const [showData,setShowData] = useState([]);

    const addval = () =>{
        console.log(todoData);
    setShowData([...showData,todoData])
    
}

const delval = (id) => {
    console.log(id);
const updateditems = showData.filter((elem, ind) => {
return ind !== id;
});
setShowData(updateditems);
}

    
    const remove = () =>{
        setShowData([]);
    }
   













    return (
<>
<Box sx={{display:"flex",justifyContent:"center"}}>

<TextField  onChange={(e) => setTodoData(e.target.value)} id="demo-helper-text-misaligned-no-helper" label="Enter Todo" />
<Button onClick={addval} sx={{color:"blue"}}><AddTaskIcon /></Button>
<Button onClick={remove} sx={{color:"red"}}><ClearAllSharpIcon /></Button>
</Box>
{showData.map((e,ind) => {
            return (
              <Box style={{display: 'flex', justifyContent: 'space-evenly'  }}>
                {e}
                <EditSharpIcon style={{ backgroundColor: '#eee', color: '#006d77', padding: 10, borderRadius: 10, fontWeight: 'bolder', cursor: 'pointer' }} />
              
                <DeleteSharpIcon onClick={()=> delval(ind)} style={{ backgroundColor: '#eee', color: '#e63946', padding: 10, borderRadius: 10, fontWeight: 'bolder', cursor: 'pointer' }} />
</Box>
            )
          })}
</>

    )
    }

export default Todo;
