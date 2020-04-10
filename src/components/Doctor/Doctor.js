import React, { Component } from "react";
import "./Doctor.scss";
import { Link } from "react-router-dom";


export default class Doctor extends Component {
  state = {
    showInfo: false,
    showAddr: false
  };

  handleEvent = (name) => {
    this.setState({
      [name]: !this.state[name]
    });
  };

  render() {
    const { id, field, img, name, info, location, counter } = this.props.doctor;
    const { removeDoctor } = this.props;
    return (
      <div className={`doctor ${this.state.showInfo ? "open": ""}`}>

        <div className="img-container">
          <img src={img} alt="" />
          <span  className='close-btn' onClick={() => { removeDoctor(id)}}>
            <i className="fas fa-window-close"></i>
          </span>
          {
            counter === 0 &&
            <div className="sticker">
              <span className="text">currently not available</span>
            </div> 
          }
        </div>

        <div className="doctor-info">
          <h3>{name}</h3>
          <h4>{field}</h4>
          <h5>
            info
              <span onClick={() => {this.handleEvent('showInfo')}}>
                <i className="fas fa-caret-square-down"></i>
              </span></h5>
            {this.state.showInfo && <p>{info}</p>}

          <h5>
            address
              <span onClick={() => {this.handleEvent('showAddr')}}>
                <i className="fas fa-caret-square-down"></i>
              </span></h5>
            {this.state.showAddr && <p>{location}</p>}

          {
            counter > 0 &&
              <h5>
              Attend a meeting
                <span>
                  <Link className="far fa-calendar-check custom-link"  to={{
                    pathname: '/AttendMeeting',
                    state: {
                      docId: id,
                      action: 'Attend a meeting with'
                    }
                }}></Link>
              </span>
            </h5>  
          }
         
          <h5>
          Make a request
            <span>
              <i className="far fa-question-circle"></i>
          </span></h5>
        </div>
      </div>
    );
  }
}