import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { AppBar, Autocomplete, Toolbar, Box, TextField } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { useState } from "react";
import { getAllMovies } from "../api-helpers/API-helpers";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
const dummyArray = ["Flash", "Batman", "Superman"];

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [Value, setValue] = useState(0);

  const [Movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));

    // console.log(data);
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <Link to="/">
            <MovieIcon style={{ color: "white" }} />
          </Link>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={Movies && Movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Movies"
              />
            )}
          />
        </Box>

        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={Value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/Movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <React.Fragment>
                <Tab LinkComponent={Link} to="/Admin" label="Admin" />
                <Tab LinkComponent={Link} to="/Auth" label="Auth" />
              </React.Fragment>
            )}
            {isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/User" label="Profile" />
                <Tab
                  onClick={() => logout(false)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}

            {isAdminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab LinkComponent={Link} to="/admin" label="Profile" />
                <Tab
                  onClick={() => logout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
