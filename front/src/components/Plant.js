import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Plant() {
    const paperStyle={padding:'50px 2px', width:600, margin:'20px auto'}
    const[name, setName]=React.useState('')
    const[address, setAddress]=React.useState('')
    const[plants, setplants]=React.useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const plant={name,address}
        console.log(plant)
        fetch("http://localhost:8080/plant/add",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(plant)
    
      }).then(()=>{
        console.log("New plant added")
      })
    }

    React.useEffect(()=>{
        fetch("http://localhost:8080/plant/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setplants(result);
        }
    )
    },[])
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1>Add plant</h1>
            <TextField id="standard-basic" label="Plant name" variant="standard" fullwidth
            value = {name}
            onChange={(e=>setName(e.target.value))}
            />
            <TextField id="standard-basic" label="Address" variant="standard" fullwidth
            value = {address}
            onChange={(e=>setAddress(e.target.value))}
            />
            <Button variant="outlined" onClick={handleClick}>Submit</Button>
        </Paper>

        <h1>Plants</h1>

        <Paper elevation={3} style={paperStyle}>

         {plants.map(plant=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={plant.id}>
                Id:{plant.id}
                Name:{plant.name}
                Address:{plant.address}
            </Paper>
            ))
        }
        </Paper>
    </Container>
    </Box>
    
  );
}
