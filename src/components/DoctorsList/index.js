import React, { Component } from 'react'
import "./DoctorsList.scss";
import Doctor from "../Doctor/Doctor"
import {doctorsData} from "../doctorsData";

export default class DoctorsList extends Component {
    state={
        doctors: doctorsData
    }
    removeDoctor = id => {
        const {doctors} = this.state;
        const sortedDoctors = doctors.filter(doctor=> doctor.id !== id)
        this.setState({
            doctors: sortedDoctors
        })
    }
    render() { 
        const {doctors} = this.state;
        return (
            <div className="doctorsList">
                {doctors.map(doctor => (<Doctor
                     key={doctor.id}
                     doctor={doctor} 
                     removeDoctor={this.removeDoctor}
                      > 
                      </Doctor>))}
            </div>
        );
    }
}
