import React from "react";
import DoctorsList from "../components/DoctorsList"
import SearchBar from '../components/SearchBar/SearchBar'
import './css/home.scss';

function home() {
    return (
        <div>
          <SearchBar></SearchBar>
          <DoctorsList></DoctorsList>
        </div>
       
      );
    };

export default home;