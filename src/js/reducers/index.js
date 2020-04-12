  
import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { filters } from './filters.reducer';

const rootReducer = combineReducers({
  authentication,
  filters
});

export default rootReducer;