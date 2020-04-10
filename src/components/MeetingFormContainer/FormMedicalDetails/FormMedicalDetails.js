import React from 'react'
import './FormMedicalDetails.scss';
import MedicalHisOptions from './../../../consts';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


const FormMedicalDetails = (props) => {
  const continute = e => {
    e.preventDefault();
    props.nextStep();
  }
  
  const back = e => {
    e.preventDefault();
    props.prevStep();
  }
  
  const disabledButton = (formErrors, values) => {
  let hasErrors = Object.values(formErrors).some(element => element.length > 0);
  let isFormEmpty = Object.values(values).some(e => (e.length === 0))
  return hasErrors || isFormEmpty;
  }
  
  const createCheckbox = option => (
    <FormControlLabel
      control={
        <Checkbox
          name={option}
          checked={props.values.checkboxes[option]}
          onChange={props.handleCheckboxChange}
          style ={{
            color: "#519e8a",
          }}
        />
      }
      label={<span style={{ fontSize: '14px' }}>{option}</span>}
      key={option}
    />);
  const createCheckboxes = () => MedicalHisOptions.map(option => createCheckbox(option));
  const { values, handleChange, handleSmokerChange, formErrors  } = props;
    //<button type="submit" disabled={this.disabledButton(formErrors, values)} onClick={this.continute}>Continute</button>

  return (
    <div className="wrapper">
      <div className="form-wrapper">
      <h1>Medical Details</h1>
        <form>
          <div className="weight">
            <label htmlFor="weight">Weight</label>
            <input
              className={formErrors.weight.length > 0 ? "error" : null}
              defaultValue={values.weight}
              placeholder="Weight"
              type="text"
              name="weight"
              noValidate
              onChange={handleChange('weight')}
            />
            {formErrors.weight.length > 0 && (
              <span className="errorMessage">{formErrors.weight}</span>
            )}
          </div>

          <div className="height">
            <label htmlFor="height">Height</label>
            <input
              className={formErrors.height.length > 0 ? "error" : null}
              defaultValue={values.height}
              placeholder="height"
              type="text"
              name="height"
              onChange={handleChange('height')}
              noValidate
            />
            {formErrors.height.length > 0 && (
              <span className="errorMessage">{formErrors.height}</span>
            )}
          </div>

        <label htmlFor="medicalHis">Medical History Diagnosis:</label>
        <div className="medical-ckbox"><FormGroup>{createCheckboxes()}</FormGroup></div>
        <label htmlFor="medicalHis">Are you a smoker?</label>
        <div className="medical-radio">
          <RadioGroup aria-label="gender" name="gender1" value={values.smoker} onChange={handleSmokerChange}>
            <FormControlLabel value="yes" key="y" control={<Radio style ={{color: "#519e8a",}}/>} label={<span style={{ fontSize: '14px' }}>yes</span>} />
            <FormControlLabel value="no" key="n" control={<Radio style ={{color: "#519e8a",}}/>} label={<span style={{ fontSize: '14px' }}>no</span>} />
          </RadioGroup>
        </div>
        <div className="createAccount">
            <button type="submit" disabled={disabledButton(formErrors, values)} onClick={continute}>Continute</button>
            <button type="submit" onClick={back}>Go Back</button>
        </div>
      </form>
  </div>
  </div>);
} 

export default FormMedicalDetails;