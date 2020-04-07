import React, { Component } from 'react'
import "./DoctorsList.scss";
import Doctor from "../Doctor/Doctor"
import { connect } from 'react-redux';

export class DoctorsList extends Component {
    state={
        doctors: [],
        filters: {
            chosenDoc: '',
            chosenField: '',
            chosenArea: ''
        }    }
    
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

    retrieveFilterredDoctors(filters) {
        let chosenDoc = filters.chosenDoc;
        let chosenField = filters.chosenField;
        let chosenArea = filters.chosenArea;
        fetch(`http://127.0.0.1:8080/filterdocs/?doc=${encodeURIComponent(chosenDoc)}&field=${encodeURIComponent(chosenField)}&area=${encodeURIComponent(chosenArea)}`, {
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

    componentDidUpdate() {
       if (this.props.filters.chosenDoc !== this.state.filters.chosenDoc ||
        this.props.filters.chosenField !== this.state.filters.chosenField ||
        this.props.filters.chosenArea !== this.state.filters.chosenArea) {
           this.setState({filters: this.props.filters})
           this.retrieveFilterredDoctors(this.props.filters)
       }
    }

    render() { 
        const {doctors} = this.state;
        return (
            <div className="docswrapper">
                <div>showing {this.state.doctors.length} results</div>
                <div className="doctorsList">
                    {doctors.map(doctor => (<Doctor
                        key={doctor.id}
                        doctor={doctor} 
                        removeDoctor={this.removeDoctor}
                        > 
                        </Doctor>))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filters: state.filters   };
  };
  
  export default connect(mapStateToProps, null)(DoctorsList);

