import React, { PureComponent } from 'react';
import SelectBox from './SelectBox';
import {appointmentsData} from "./../../appointmentsData";

export default class FormChooseDate extends PureComponent {
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
                {this.createSelectList("year", appointmentsData[0].avalYears)}    
                {year !== '' 
                && this.createSelectList("month", appointmentsData[1][year])}

                {month !== '' && year !== '' 
                && this.createSelectList("day", appointmentsData[2][month])}

                {month !== '' && year !== '' && day !== ''
                && this.createSelectList("hour", appointmentsData[3][(day + month)])}

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
