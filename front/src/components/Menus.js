import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container, Paper } from '@mui/material';

export default function BasicSelect() {
  const [age, set] = React.useState('');
  const paperStyle = { padding: '20px 10px', margin: '20px auto' };

  const handleChange = (event) => {
    const value = event.target.value;
    setAge(value);
  };


  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
      <div style={{ display: 'inline-block' }}>
        <Box sx={{ minWidth: 120, margin: '10px' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Plant type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Floor</MenuItem>
              <MenuItem value={20}>Hanging</MenuItem>
              <MenuItem value={30}>Table</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, margin: '10px' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Ease of care</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Easy</MenuItem>
              <MenuItem value={20}>Average</MenuItem>
              <MenuItem value={30}>Difficult</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, margin: '10px' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Toxicity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Non-Toxic</MenuItem>
              <MenuItem value={20}>Toxic</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, margin: '10px' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Lighting</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Low</MenuItem>
              <MenuItem value={20}>Medium</MenuItem>
              <MenuItem value={30}>High</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, margin: '10px' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Trimming</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Yes</MenuItem>
              <MenuItem value={20}>No</MenuItem>
              <MenuItem value={30}>Doesn't matter</MenuItem>
            </Select>
          </FormControl>
        </Box>
        </div>
      </Paper>
    </Container>
  );
}

