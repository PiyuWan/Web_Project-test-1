import React, { useEffect, useState } from 'react';
import {AppBar, Box, Toolbar,Autocomplete,TextField, Tabs, Tab} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from '../api-helpers/api-helpers';



const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([])
  useEffect(() => {
    getAllMovies().then((data) => setMovies(data.movies))
    .catch((err) => console.log(err));
  },[]);
  
  return <AppBar sx={{ bgcolor: "#E50914"}}>
    <Toolbar>
      <Box width={'25%'}>
        <MovieIcon/>
      </Box>
      <Box width={'30%'} margin={'auto'}>
      <Autocomplete
        
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => 
        <TextField sx={{ input :{ color: "white"} }}
        variant='standard' 
        {...params} 
        placeholder="Search Across Multiple Movies" />}
      />

      </Box>
      <Box display={"flex"}>
        <Tabs textColor = "inherit" 
         value={value} 
         indicatorColor="secondary" 
         onChange={(e,val) => setValue(val)}>

          <Tab label = "Movies"/>
          <Tab label = "Admin"/>
          <Tab label = "Auth"/>

        </Tabs>
         
      </Box>
      
    </Toolbar>
  </AppBar>
};

export default Header;