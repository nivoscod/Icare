import { ADD_CHOSEN_DOC } from '../actions';
import { ADD_CHOSEN_FIELD } from '../actions';

const initialState = {
    chosenDoc: '',
    chosenField: ''
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_CHOSEN_DOC:
      return {
       chosenDoc: action.name
      };
      break;
    default:
      return state;
  };
}

export default rootReducer;