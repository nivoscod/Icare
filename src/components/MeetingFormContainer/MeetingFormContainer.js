import React, { Component } from 'react'
import FormUserDetails from "./FormUserDetails/FormUserDetails";
import FormMedicalDetails from "./FormMedicalDetails/FormMedicalDetails";
import FormChooseDate from "./FormChooseDate/FormChooseDate"
import MedicalHisOptions from './../../consts';
import SuccessForm from './SuccessForm/SuccessForm'
import axios from 'axios';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

export class MeetingFormContainer extends Component {
  state= {
      step: 1,
      docId: this.props.docId,
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      id: '',
      phonePreFix: '',
      phoneNum: '',
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
        height: "",
        phonePreFix: "",
        phoneNum: ""
      },
      appointment: {
        year: "",
        month: "",
        day: "",
        hour: ""
      },
      confirmNum: '-1'
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
        case "day":
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
            case "phoneNum":
              formErrors.phoneNum = 
                value.length !== 7 ? "please enter 7 digits after your prefix" : "";
              break;
            case "phonePreFix":
              formErrors.phonePreFix = 
                value.length !== 3 || (value[0] !== '0' || value[1] !== '5') ? "please enter valid phone prefix" : "";
              break;
            default:
              break;
          }
      
          this.setState({ formErrors, [name]: value });
    }


    mixingCheckboxes = () => {
      let trueCheckBoxs = '';
      let checkBoxes = this.state.checkboxes;
      Object.keys(checkBoxes).map((keyName) => {
        if (checkBoxes[keyName] === true) {
          trueCheckBoxs = trueCheckBoxs + keyName + ' ';
        }
      })
      return trueCheckBoxs;
    }

    handleSubmission = () => {
      let trueCheckBoxs = this.mixingCheckboxes();
      let data = {
        docId: this.state.docId,
        patId: this.state.id,
        patFname: this.state.firstName,
        patLname: this.state.firstName,
        patTel: this.state.phonePreFix + this.state.phoneNum,
        patEmail: this.state.email,
        patCity: this.state.city,
        patWeight: this.state.weight,
        patHeight: this.state.height,
        patMedicalHistory: trueCheckBoxs,
        patSmoker: this.state.smoker,
        appointment: this.state.appointment
      }
      let url = 'http://127.0.0.1:8080/attendappointment';
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
      
      axios.post(url, data, axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        this.setState({confirmNum: String(res.data)})
        this.setState({step: 4})

      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, city, id, phoneNum, phonePreFix, formErrors, checkboxes, weight, height, smoker, appointment } = this.state;
        const valuesform1 = { firstName, lastName, email, city, id, phoneNum, phonePreFix }
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
                    handleSelectChange={this.handleSelectChange}
                    docId={this.props.docId} 
                    submit={this.handleSubmission} />
                  )
            case 4:
                return (
                  <div>
                    {this.state.confirmNum !== '-1' && <SuccessForm appointment={appointment} confirmNum={this.state.confirmNum}/>}
                  </div>
                  )
            default:
              break;
        }
    }
}

export default MeetingFormContainer
