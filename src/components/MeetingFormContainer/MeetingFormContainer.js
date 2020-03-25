import React, { Component } from 'react'
import FormUserDetails from "./FormUserDetails/FormUserDetails";
import FormMedicalDetails from "./FormMedicalDetails/FormMedicalDetails";
import FormChooseDate from "./FormChooseDate/FormChooseDate"
import {appointmentsData} from "../appointmentsData";
import MedicalHisOptions from './../../consts';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

export class MeetingFormContainer extends Component {
  state= {
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      id: '',
      weight: '',
      height: '',
      checkboxes: MedicalHisOptions.reduce(
        (MedicalHisOptions, option) => ({
          ...MedicalHisOptions,
          [option]: false,
        }),
        {}
      ),
      smoker: '',
      formErrors: {
        firstName: "", 
        lastName: "",
        city: "",
        id: "",
        email: "",
        weight: "",
        height: ""
      },
      appointmentsData: appointmentsData,
      appointment: {
        year: "",
        month: "",
        day: "",
        hour: ""
      }

  }

  handleSmokerChange = e => {
    this.setState({
      smoker: e.target.value
    })}

  handleCheckboxChange = changeEvent => {
    let checkboxes = { ...this.state.checkboxes };
    const { name } = changeEvent.target;
    checkboxes[name] = !this.state.checkboxes[name]
    this.setState({ checkboxes });
  };

  handleSelectChange = name => (e) => {
    let appointment = { ...this.state.appointment };
    switch(name) {
      case "year":
        appointment.month = '';
        appointment.day = '';
        appointment.hour = ''
        break;
      case "month":
        appointment.day = '';
        appointment.hour = '';
        break;
      default:
        break;
    }

    appointment[name] = e.target.value
    this.setState({ appointment});
      
}

  // Procees to next step
  nextStep = () => {
      const { step }  = this.state;
      this.setState({
          step: step + 1
      });
  }

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    // Handle fields change
    handleChange = () => e => {
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
            case "firstName":
              formErrors.firstName =
                value.length < 3 ? "minimum 3 characaters required" : "";
              break;
            case "lastName":
              formErrors.lastName =
                value.length < 3 ? "minimum 3 characaters required" : "";
              break;
            case "email":
              formErrors.email = emailRegex.test(value)
                ? ""
                : "invalid email address";
              break;
            case "id":
              formErrors.id =
                value.length < 9 ? "minimum 9 numbers required" : "";
              break;
            case "weight":
              formErrors.weight = 
                value.length < 2 ? "minimum 2 numbers required" : "";
              break;
            case "height":
              formErrors.height = 
                value.length < 2 ? "minimum 2 numbers required" : "";
              break;
            default:
              break;
          }
      
          this.setState({ formErrors, [name]: value });
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, city, id, formErrors, checkboxes, weight, height, smoker, appointment } = this.state;
        const valuesform1 = { firstName, lastName, email, city, id }
        const valuesform2 = { checkboxes , weight, height, smoker }

        switch(step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={valuesform1}
                        formErrors={formErrors}
                        />
                )
            case 2:
                return (
                  <FormMedicalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={valuesform2}
                        formErrors={formErrors}
                        handleSmokerChange= {this.handleSmokerChange}
                        createCheckboxes={this.createCheckboxes}
                        handleCheckboxChange={this.handleCheckboxChange} />
                )
            case 3:
                return (
                  <FormChooseDate 
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    appointmentDetails={appointment}
                    handleSelectChange={this.handleSelectChange} />
                  )
            case 4:
                return <h1>Success</h1>
        }
    }
}

export default MeetingFormContainer
