import React, { Component } from 'react'
import './SearchBar.scss'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { addFilters } from '../../js/actions'


export class SearchBar extends Component {
  state= {
      mecdicalFields: [],
      filters: {
        chosenDoc: '',
        chosenField: '',
        chosenArea: ''
      }
  }

  retrieveMedicalFields = () => {
    fetch(`http://127.0.0.1:8080/medicalFields`, {
        method: 'GET',
    })
    .then(response => { return response.json();})
    .then(responseData => {console.log(responseData); return responseData;})
    .then(data => {this.setState({"mecdicalFields" : data});})
    .catch(err => {
        console.log("fetch error" + err);
    });
}
  componentDidMount(){
    this.retrieveMedicalFields();
  }

  handleSelectChange = name => (event, values) => {
    let filters = {...this.state.filters}
    switch(name) {
      case 'field':
        if (values === null) { filters.chosenField = ''}
        else filters.chosenField = values[name]
        break;
      default:
        break
    }
    this.setState({filters})

  }

    handleTextChange = name => (event) => {
      let filters = {...this.state.filters}
      switch(name) {
        case 'name':
          filters.chosenDoc = event.target.value;
          break;
        case 'area':
          filters.chosenArea = event.target.value;
          break;
        default:
          break;
      }

      this.setState({filters})
    }

  createSelectList = (type, items) => (
      <div>
        <Autocomplete
          onChange={this.handleSelectChange(type)}
          id="combo-box-demo"
          options={items}
          getOptionLabel={(item) => item[type]}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Field' variant="outlined" />}
    />
      </div>
  );

  handleSubmission = (e) => {
    e.preventDefault();
    this.props.addfilters(this.state.filters);
  }

    render() {
      return (
      <div className="searchBar">
        <div className="contentSrch"><h4>Any Doctor, Anywhere!</h4></div>
        <div className="selectsLists"> 
          <div className="srcbaritem">{this.createSelectList("field", this.state.mecdicalFields)}</div>
          <div className="srcbaritem"><TextField id="outlined-basic" label="Doctor Name" variant="outlined" onChange={this.handleTextChange('name')}/></div>
          <div className="srcbaritem"><TextField id="outlined-basic" label="Area/Address" variant="outlined" onChange={this.handleTextChange('area')}/></div>
          <div className="srcbaritembutton"> <button type="submit" onClick={this.handleSubmission}>Find me a doctor!</button> </div>
        </div>

      </div>)
    }
}

export default connect(
  null,
  {
    addfilters: addFilters
  }
)(SearchBar);