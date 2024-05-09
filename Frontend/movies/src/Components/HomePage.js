import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItems from "./Movies/MovieItems";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/API-helpers";
import godzilla from "../Assests/godzilla.jpg";
const HomePage = () => {
  const [Movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  // console.log(Movies);
  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Box width={"90%"} height={"40vh"} margin={"auto"} padding={2}>
        <img src={godzilla} alt="Kong" width={"100%"} height={"100%"} />
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        display={"flex"}
        width={"80%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        margin={"auto"}
      >
        {Movies &&
          Movies.slice(0, 4).map((movie, index) => (
            <MovieItems
              id={movie.id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              key={index}
            />
          ))}
      </Box>
      <Box display={"flex"} padding={5} margin="auto" justifyContent={"center"}>
        {/* <button
          LinkComponent={Link}
          to="/Movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </button> */}

        <button
          onClick={() => {
            window.location.href = "/Movies";
          }}
          variant="outlined"
          style={{ margin: "auto", color: "#2b2d42", textDecoration: "none" }}
        >
          View All Movies
        </button>
      </Box>
    </Box>
  );
};

export default HomePage;
