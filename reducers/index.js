import { combineReducers } from 'redux';

import auth from './auth_reducer';
import yelp from './yelp_reducer';

export default combineReducers({
	auth,
	yelp
});

