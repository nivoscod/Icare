import React, { Component } from 'react'
import './FormUserDetails.scss';

export class FormUserDetails extends Component {
    continute = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    disabledButton = (formErrors, values) => {
      let hasErrors = Object.values(formErrors).some(element => element.length > 0);
      let isFormEmpty = Object.values(values).some(e => (e.length === 0))
      return hasErrors || isFormEmpty;
    }
    
    render() {
        const { values, formErrors, handleChange } = this.props;
        //<button disabled={this.disabledButton(formErrors, values)} type="submit" onClick={this.continute}>Continute</button>
        return (
          <div className="wrapper">
          <div className="form-wrapper">
          <h1>Personal Details</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  className={formErrors.firstName.length > 0 ? "error" : null}
                  defaultValue={values.firstName}
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  noValidate
                  onChange={handleChange('firstName')}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className={formErrors.lastName.length > 0 ? "error" : null}
                  defaultValue={values.lastName}
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  onChange={handleChange('lastName')}
                  noValidate
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  defaultValue={values.email}
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={handleChange('email')}
                  noValidate
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="city">
                <label htmlFor="city">City</label>
                <input
                  defaultValue={values.city}
                  placeholder="City"
                  type="text"
                  name="city"
                  onChange={handleChange('city')}
                  noValidate
                />
              </div>
              <div className="id">
              <label htmlFor="id">Id</label>
              <input
                className={formErrors.id.length > 0 ? "error" : null}
                defaultValue={values.id}
                placeholder="Id"
                type="id"
                name="id"
                onChange={handleChange('id')}
                noValidate
              />
              {formErrors.id.length > 0 && (
                <span className="errorMessage">{formErrors.id}</span>
              )}
              </div>
              <div className="createAccount">
              <button  type="submit" onClick={this.continute}>Continute</button>
              </div>
            </form>
          </div>
        </div>
        );
    }
}

export default FormUserDetails
