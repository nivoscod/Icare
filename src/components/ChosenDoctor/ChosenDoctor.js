import React, { Component } from 'react'
import './ChosenDoctor.scss';

export default class ChosenDoctor extends Component {
    state={
        doctor: []
    }

    retrieveDoctor = docId => {
        fetch(`http://127.0.0.1:8080/doctors/${docId}`, {
            method: 'GET',
        })
        .then(response => { return response.json();})
        .then(responseData => {console.log(responseData); return responseData;})
        .then(data => {this.setState({"doctor" : data[0]});})
        .catch(err => {
            console.log("fetch error" + err);
        });
    }

    componentDidMount() {
        this.retrieveDoctor(this.props.docId);
      }

    render() { 
         return (
            <div className="chosendoc-wrapper">
                <img src={this.state.doctor.img} alt="" className="chosendoc-img" />
                <div className="chosendoc-txt">
                    <h3> {this.props.action + ' ' + this.state.doctor.name}  </h3> 
                    <h4> {this.state.doctor.location}  </h4>
                </div>
            </div>
        );
    }
}
