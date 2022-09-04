import React, { useState,useEffect } from "react";
import { Alert, Box, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';


function PostUserData() {


    const [userData, setUserData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:7000/user').then((res)=>{
            console.log(res);
       setUserData(res.data);
        })
    },[])


    const [userName,setUserName] =useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    

    let userDataObj = {
        userName,
        email,
        password,
    }

    const addUser=() =>{
        let errArr = [];
        if(!userName){
            errArr.push("Required: Name");
            
        }
        if(!email){
            errArr.push("Required: Email");
            
        }
        if(!password){
            errArr.push("Required: Password");
            
        }
        if(errArr && errArr.length > 0){
            alert(errArr);
            return;
        }
        axios.post("http://localhost:7000/user",userDataObj).then((res) =>{
            console.log(res);
           alert("User Add Succesfully");
        })
    }

    const Delete = (item)=>{
        console.log(item)
        axios.delete("http://localhost:7000/user/"+item).then((res)=>{
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
<h1 style={{marginLeft:"110px"}}>Email</h1>
<h1 style={{marginLeft:"90px"}}>Password</h1>
</Box>

<br />
<br />

{userData.map(e => 
<>

<Box sx={{display:"flex",justifyContent:"space-evenly",backgroundColor:"#ffc300", fontSize:"20px", borderRadius: 30, width:"90%",marginLeft: "70px"}}>

<p style={{marginLeft:"-80px"}}>{e.userName}</p>
<p style={{marginLeft:"40px"}}>{e.email}</p>
<p>{e.password}</p>
<Box sx={{marginRight: '-100px',}}>
<EditSharpIcon style={{ backgroundColor: '#eee', color: '#006d77', padding: 10, borderRadius: 10, fontWeight: 'bolder', cursor: 'pointer', marginRight: '-90px', marginTop:"10px"  }} />
              
              <DeleteSharpIcon onClick={()=> Delete(e.email)} style={{ backgroundColor: '#eee', color: '#e63946', padding: 10, borderRadius: 10, fontWeight: 'bolder', cursor: 'pointer',marginRight: '-90px' }} />
</Box>

</Box>
</>
        )}
         
         
            <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center",marginTop:10 }}>
                        <Typography variant="h4">Please Enter Data</Typography>
                        
                <Box sx={{ width: "50%", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ padding: 3 }}>

                        <TextField onChange={(e)=> setUserName(e.target.value)} id="filled-basic" label="Name" required={true} type="text" variant="filled" sx={{ width: 300 }} />
                    </Box>

                    <Box sx={{ padding: 3 }}>

                        <TextField onChange={(e)=> setEmail(e.target.value)} id="filled-basic" label="Email" required={true} type="email" variant="filled" sx={{ width: 300 }} />
                    </Box>

                    <Box sx={{ padding: 3 }}>

                        <TextField onChange={(e)=> setPassword(e.target.value)} id="filled-basic" label="Password" type="password" required={true} variant="filled" sx={{ width: 300 }} />
                    </Box>

                    <Box sx={{ padding: 3 }}>
                    <Button variant="contained" onClick={addUser}><AddBoxIcon/> Add User</Button>

                    </Box>

                </Box>
            </Box>



        </>
    )
}


export default PostUserData;