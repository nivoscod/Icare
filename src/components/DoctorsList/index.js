import React, { Component } from 'react'
import "./DoctorsList.scss";
import Doctor from "../Doctor/Doctor"

export default class DoctorsList extends Component {
    state={
        doctors: []
    }
    removeDoctor = id => {
        const {doctors} = this.state;
        const sortedDoctors = doctors.filter(doctor=> doctor.id !== id)
        this.setState({
            doctors: sortedDoctors
        })
    }


    retrieveDoctors() {
        fetch('http://127.0.0.1:8080/doctors', {
            method: 'GET',
        })
        .then(response => { return response.json();})
        .then(responseData => {console.log(responseData); return responseData;})
        .then(data => {this.setState({"doctors" : data});})
    
        .catch(err => {
            console.log("fetch error" + err);
        });
    }


    componentDidMount() {
        this.retrieveDoctors();
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
