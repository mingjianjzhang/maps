import { 
	FETCH_RESTAURANTS
} from '../actions/types';


const INITIAL_STATE = {
	restaurants: []
}
export default function(state={}, action) {
	switch (action.type) {
		case FETCH_RESTAURANTS:
			console.log(action, "here I'm getting fetched");
			return { ...state, restaurants: action.payload.businesses}
		default:
			return state
	}
}
