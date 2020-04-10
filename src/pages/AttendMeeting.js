import React, { Component } from "react";
import { MeetingFormContainer } from '../components/MeetingFormContainer/MeetingFormContainer';
import ChosenDoctor from '../components/ChosenDoctor/ChosenDoctor.js';
import './css/AttendMeeting.scss';
export default class AttendMeeting extends Component {
    render() {
      const {docId, action } = this.props.location.state;
    return (
      <div>
        <ChosenDoctor action={action} docId={docId}/>
        <MeetingFormContainer docId={docId} />
      </div>
      )
    }
}