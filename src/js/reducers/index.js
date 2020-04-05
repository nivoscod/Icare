import { ADD_CHOSEN_DOC } from '../actions';

const initialState = {
    chosenDoc: ''
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_CHOSEN_DOC:
      return {
       chosenDoc: action.name
      };

    default:
      return state;
  };
}

export default rootReducer;