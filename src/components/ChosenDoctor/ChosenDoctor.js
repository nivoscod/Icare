import React, { Component } from 'react'
import './ChosenDoctor.scss';

export default class ChosenDoctor extends Component {
    state={
        doctor: []
    }

    retrieveDoctor = docId => {
        console.log('hi')
        fetch(`http:/127.0.0.1:8080/doctors/${docId}`, {
            method: 'GET',
        })
        .then(response => { return response.json();})
        .then(responseData => {console.log(responseData); return responseData;})
        .then(data => {this.setState({"doctor" : data});})
        .catch(err => {
            console.log("fetch error" + err);
        });
    }

    componentDidMount() {
        console.log('mountes')
        this.retrieveDoctor(this.props.docId);
      }

    render() { 
         return (
            <div className="chosendoc-wrapper">
            <img src={this.doctor.img} alt="" className="chosendoc-img" />
            <div className="chosendoc-txt">
                <h3> {this.props.action + ' ' + this.doctor.name}  </h3> 
                <p> {this.docotr.location}  </p>
            </div>
            </div>
        );
    }
}
