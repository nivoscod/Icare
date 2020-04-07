import { ADD_FILTERS } from '../actions';

const initialState = {
  filters: {
    chosenDoc: '',
    chosenField: '',
    chosenArea: ''
  }
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_FILTERS:
      return {
        ...state,
       filters: action.filters
      };
    default:
      return state;
  };
}

export default rootReducer;