import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AttendMeeting from './pages/AttendMeeting';
import Login from './components/Login/Login';


function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/AttendMeeting" component={AttendMeeting}></Route>
        <Route exact path="/Login" component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;