import React, { useState,useEffect } from "react";
import { Alert, Box, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

function PostEventData() {

    const [eventData, setEventData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:7000/event').then((res)=>{
            console.log(res);
            setEventData(res.data);
        })
    },[])



    const [meetingName,setMeetingName] =useState('');
    const [time,setTime] =useState('');
    const [place,setPlace] =useState('');
    

    let userDataObj = {
        meetingName,
        time,
        place,
    }

    const addUser=() =>{
        let errArr = [];
        if(!meetingName){
            errArr.push("Required: MeetingName");
            
        }
        if(!time){
            errArr.push("Required: time");
            
        }
        if(!place){
            errArr.push("Required: place");
            
        }
        if(errArr && errArr.length > 0){
            alert(errArr);
            return;
        }
        axios.post("http://localhost:7000/event",userDataObj).then((res) =>{
            console.log(res);
           alert("User Add Succesfully");
        })
    }

    const Delete = (del)=>{
        console.log(del)
        axios.delete("http://localhost:7000/event/"+del).then((res)=>{
            console.log(res);
            
        }).catch((err)=>{
            console.log(err);
        })
    }
      
    return (
        <>

<br />
<br />
<br />
<br />
<Box sx={{display:"flex",justifyContent:"space-evenly", backgroundColor: "#00b4d8", color: "white", fontFamily: "cursive", borderRadius: "50px", width : "1000px",marginLeft: "150px" }}>
<h1 style={{marginLeft:"-90px"}}>Name</h1>
<h1 style={{marginLeft:"110px"}}>Time</h1>
<h1 style={{marginLeft:"90px"}}>Place</h1>
</Box>

<br />
<br />

{eventData.map(e => 
<>

<Box sx={{display:"flex",justifyContent:"space-evenly",backgroundColor:"#ffc300", fontSize:"20px", borderRadius: 30, width:"90%",marginLeft: "70px"}}>

<p style={{marginLeft:"-80px"}}>{e.meetingName}</p>
<p style={{marginLeft:"40px"}}>{e.time}</p>
<p>{e.place}</p>
<Box sx={{marginRight: '-100px',}}>
<EditSharpIcon style={{ backgroundColor: '#eee', color: '#006d77', padding: 10, borderRadius: 10, fontWeight: 'bolder', cursor: 'pointer', marginRight: '-90px', marginTop:"10px"  }} />
              
              <DeleteSharpIcon onClick={()=> Delete(e.meetingName)} style={{ backgroundColor: '#eee', color: '#e63946', padding: 10, borderRadius: 10, fontWeight: 'bolder', cursor: 'pointer',marginRight: '-90px' }} />
</Box>

</Box>
</>
        )}


            <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center",marginTop:10 }}>
                        <Typography variant="h4">Please Enter Events</Typography>
                        
                <Box sx={{ width: "50%", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ padding: 3 }}>

                        <TextField onChange={(e)=> setMeetingName(e.target.value)} id="filled-basic" label="Name" required={true} type="text" variant="filled" sx={{ width: 300 }} />
                    </Box>

                    <Box sx={{ padding: 3 }}>

                        <TextField onChange={(e)=> setTime(e.target.value)} id="filled-basic" label="time" required={true} type="time" variant="filled" sx={{ width: 300 }} />
                    </Box>

                    <Box sx={{ padding: 3 }}>

                        <TextField onChange={(e)=> setPlace(e.target.value)} id="filled-basic" label="place" type="place" required={true} variant="filled" sx={{ width: 300 }} />
                    </Box>

                    <Box sx={{ padding: 3 }}>
                    <Button variant="contained" onClick={addUser}><AddBoxIcon/> Add User</Button>

                    </Box>

                </Box>
            </Box>



        </>
    )
}


export default PostEventData;