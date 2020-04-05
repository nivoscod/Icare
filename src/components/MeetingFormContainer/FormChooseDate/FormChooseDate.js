import React, { PureComponent } from 'react';
import SelectBox from '../../SelectBox/SelectBox';

export default class FormChooseDate extends PureComponent {
    state={
        avalYears: [],
        avalMonths: [],
        avalDays: [],
        avalHours: [],
        appointmentDetails: this.props.appointmentDetails
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
            let appointmentDetails = { ...this.state.appointmentDetails };
            appointmentDetails.year = '';
            appointmentDetails.day = '';
            appointmentDetails.month = '';
            appointmentDetails.hour = '';
            this.retrieveYears(this.props.docId)          
            this.setState({ appointmentDetails })
      }

    componentDidUpdate(prevProps, prevState) {
        const day = this.props.appointmentDetails['day'];
        const month = this.props.appointmentDetails['month'];
        const year = this.props.appointmentDetails['year'];

        if (prevState.appointmentDetails.year != this.state.appointmentDetails.year) {
                this.retrieveMonths(this.props.docId, year)          
        }
        if (prevState.appointmentDetails.month != this.state.appointmentDetails.month) {
                this.retrieveDays(this.props.docId, year, month) 
        }

        if (prevState.appointmentDetails.day != this.state.appointmentDetails.day) {
                this.retrieveHours(this.props.docId, year, month, day) 
        }

        let appointmentDetails = this.props.appointmentDetails
        this.setState({ appointmentDetails });
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
        const appointmentDetails2 = this.props.appointmentDetails
        const { avalYears, avalMonths, avalDays, avalHours } = this.state;
        let day = appointmentDetails2['day'];
        let month = appointmentDetails2['month'];
        let year = appointmentDetails2['year'];
        let hour = appointmentDetails2['hour'];
        //<button disabled={this.disabledButton(formErrors, values)} type="submit" onClick={this.continute}>Continute</button>
        return (
          <div className="wrapper">
          <div className="form-wrapper">
          <h1>Pick a Date</h1>
            <form>
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
