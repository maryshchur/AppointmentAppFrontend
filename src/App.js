import logo from './logo.svg';
import './App.css';
import React from "react";
import Routers from "./routers";
import {createTheme} from "@mui/material";

const theme = createTheme();

function App() {
  return (
      <div className="App">
        <Routers/>
      </div>
  );
}

export default App;
