import React, { Component } from 'react';
import "./App.scss";
import Navbar from './components/Navbar/Navbar';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AttendMeeting from './pages/AttendMeeting';


function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/AttendMeeting" component={AttendMeeting}></Route>
      </Switch>
    </>
  );
}

export default App;