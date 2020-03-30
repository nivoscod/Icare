import React, { PureComponent } from 'react';
import SelectBox from './SelectBox';
import {appointmentsData} from "./../../appointmentsData";


export default class FormChooseDate extends PureComponent {
    state={
        avalYears: [],
        avalMonths: [],
        avalDays: [],
        avalHours: []
    }

    retrieveYears = docId => {
        fetch(`http://127.0.0.1:8080/availability/${docId}`, {
            method: 'GET',
        })
        .then(response => { return response.json();})
        .then(responseData => {console.log(responseData); return responseData;})
        .then(data => {this.setState({"avalYears" : data});})
        .catch(err => {
            console.log("fetch error" + err);
        });
    }

    retrieveMonths = (docId, year) => {
        fetch(`http://127.0.0.1:8080/availability/${docId}/${year}`, {
            method: 'GET',
        })
        .then(response => { return response.json();})
        .then(responseData => {console.log(responseData); return responseData;})
        .then(data => {this.setState({"avalMonths" : data});})
        .catch(err => {
            console.log("fetch error" + err);
        });
    }

    retrieveDays = (docId, year, month) => {
        console.log(`http://127.0.0.1:8080/availability/${docId}/${year}/${month}`)
        fetch(`http://127.0.0.1:8080/availability/${docId}/${year}/${month}`, {
            method: 'GET',
        })
        .then(response => { return response.json();})
        .then(data => {this.setState({"avalDays" : data});})
        .catch(err => {
            console.log("fetch error" + err);
        });
    }

    retrieveHours = (docId, year, month, day) => {
        fetch(`http://127.0.0.1:8080/availability/${docId}/${year}/${month}/${day}`, {
            method: 'GET',
        })
        .then(response => { return response.json();})
        .then(data => {this.setState({"avalHours" : data});})
        .catch(err => {
            console.log("fetch error" + err);
        });
    }


    componentDidMount() {
        this.retrieveYears(this.props.docId);
      }

    componentDidUpdate() {
        const day = this.props.appointmentDetails['day'];
        const month = this.props.appointmentDetails['month'];
        const year = this.props.appointmentDetails['year'];
        const { avalMonths, avalDays, avalHours } = this.state;
        if (this.props.appointmentDetails['year'] != '') {
            if (Object.keys(avalMonths).length === 0) 
                this.retrieveMonths(this.props.docId, year) 
        }
        
        if (this.props.appointmentDetails['month'] != '') {
            if (Object.keys(avalDays).length === 0) 
                this.retrieveDays(this.props.docId, year, month) 
        }

        if (this.props.appointmentDetails['day'] != '') {
            if (Object.keys(avalHours).length === 0) 
                this.retrieveHours(this.props.docId, year, month, day) 
        }
    }
    
    continute = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    createSelectList = (type, items) => (
        <SelectBox
        appointment={this.props.appointmentDetails}
        items={items}
        handleSelectChange={this.props.handleSelectChange}
        type={type}
        selectedVal = {this.props.appointmentDetails[type]}
      />
    );

    render() {
        const appointmentDetails = this.props.appointmentDetails
        const { avalYears, avalMonths, avalDays, avalHours } = this.state;
        let day = appointmentDetails['day'];
        let month = appointmentDetails['month'];
        let year = appointmentDetails['year'];
        let hour = appointmentDetails['hour'];
        //<button disabled={this.disabledButton(formErrors, values)} type="submit" onClick={this.continute}>Continute</button>
        return (
          <div className="wrapper">
          <div className="form-wrapper">
          <h1>Pick a Date</h1>
            <form onSubmit={this.handleSubmit} noValidate>
                {this.createSelectList("year", avalYears)}   

                {year !== '' 
                && this.createSelectList("month", avalMonths)}

                {month !== '' && year !== '' 
                && this.createSelectList("day", avalDays)}

                {month !== '' && year !== '' && day !== ''
                 && this.createSelectList("hour", avalHours)}

               {
                        month !== '' && year !== '' && day !== '' && hour !== ''
                    &&  (
                        <div className="createAccount">
                            <h4>Your Choise: {day + '/' + month + '/'+ year + ' at ' + hour}</h4>
                            <button  type="submit" onClick={this.continute}>Continute</button>
                            <button type="submit" onClick={this.back}>Go Back</button>
                        </div>
                    )
                }   
            </form>
            </div>
        </div>
        );
    }
}
