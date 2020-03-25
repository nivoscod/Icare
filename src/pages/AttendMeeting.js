import React, { Component } from "react";
import { MeetingFormContainer } from '../components/MeetingFormContainer/MeetingFormContainer';
import ChosenDoctor from '../components/ChosenDoctor/ChosenDoctor.js';

export default class AttendMeeting extends Component {
    render() {
      const {docId, action } = this.props.location.state;
    return (
      <div className='meetform'>
        <ChosenDoctor action={action} docId={docId}/>
        <MeetingFormContainer />
      </div>
      )
    }
}