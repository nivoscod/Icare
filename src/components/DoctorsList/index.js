import React, { Component } from 'react'
import "./DoctorsList.scss";
import Doctor from "../Doctor/Doctor"
import { connect } from 'react-redux';

export class DoctorsList extends Component {
    state={
        doctors: [],
        chosenDoc: this.props.chosenDoc,
        chosenField: this.props.chosenField
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

    retrieveFilterredDoctors(chosenDoc, chosenField) {
        const data = {chosenDoc:chosenDoc, chosenField:chosenField};
        console.log(`http://127.0.0.1:8080/filterdocs/?doc=${encodeURIComponent(chosenDoc)}&field=${encodeURIComponent(chosenField)}`)
        fetch(`http://127.0.0.1:8080/filterdocs/?doc=${encodeURIComponent(chosenDoc)}&field=${encodeURIComponent(chosenField)}`, {
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
        if (this.props.chosenDoc != this.state.chosenDoc) {
            console.log(this.props.chosenDoc)
            this.setState({chosenDoc: this.props.chosenDoc})
            this.retrieveFilterredDoctors(this.props.chosenDoc, '');

        }
        if (this.props.chosenField != this.state.chosenField) {
            this.setState({chosenField: this.props.chosenField})
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
        chosenDoc: state.chosenDoc    };
  };
  
  export default connect(mapStateToProps, null)(DoctorsList);

