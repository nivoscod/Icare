import React, { Component } from 'react'
import './ChosenDoctor.scss';
import {doctorsData} from "../doctorsData";

export default class ChosenDoctor extends Component {
    render() {
        const { docId, action } = this.props;
        return (
            <div className="chosendoc-wrapper">
            <img src={doctorsData[docId-1].img} alt="" className="chosendoc-img" />
            <div className="chosendoc-txt">
                <h3> {action + ' ' + doctorsData[docId-1].name}  </h3> 
                <p> {doctorsData[docId-1].location}  </p>
                <p> sunday-thursday: 8am-8pm  </p>
            </div>
            </div>
                    
        )
    }
}