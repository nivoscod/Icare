import React from 'react';
import './SuccessForm.scss'

function SuccessForm(props) {

  const getDayName = (dateStr, locale) => {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
  }

  const getMonthName = (dateStr, locale) => {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { month: 'long' });        
}
  
  const strDate = () => { 
    return String(props.appointment.month + '/' + props.appointment.day + '/' + props.appointment.year)
  }

  return (
      <div className="success">
        <img src="./img/approve.png" alt="success"></img>
        <h2>Your appointment is confirmed!</h2>
        <h4>Confirmation number: {props.confirmNum}</h4>
        <time className="icon">
          <em>{getDayName(strDate(), 'en-US')}</em>
          <strong>{getMonthName(strDate(), 'en-US') + ' ' + props.appointment.year}</strong>
          <span>{props.appointment.day}</span>
        </time>
        <h3>{'At ' + props.appointment.hour}</h3>
      </div>
  )
}
export default SuccessForm;