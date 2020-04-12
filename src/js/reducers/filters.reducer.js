import { filtersConstants } from '../constants/filters.constants';

const initialState = {
    filters: {
      chosenDoc: '',
      chosenField: '',
      chosenArea: ''
    }
  };
  
  export function filters(state = initialState, action) {
    switch(action.type) {
      case filtersConstants.ADD_FILTERS:
        return {
          ...state,
         filters: action.filters
        };
      default:
        return state;
    };
  }
