import './SelectBok.scss'
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectBox = ({ selectedVal, items, type, handleSelectChange }) => (
  <div className="selectDiv">
      <FormControl className={useStyles().formControl}>
        <InputLabel id="demo-simple-select-label">{type}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleSelectChange(type)}
          value = {selectedVal}
        > 
        {
          items.map((obj) => { 
          return <MenuItem value={obj[type]} key={obj[type]}>{obj[type]}</MenuItem> 
          })
        }
        </Select>
      </FormControl>
      </div>
);
export default SelectBox;
