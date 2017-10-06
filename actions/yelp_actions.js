import {
	FETCH_RESTAURANTS,
	YELP_AUTH
} from './types';

export const fetchRestaurants = (region, callback) => async(dispatch) => {
		try {
			let restaurants = await ( await fetch(
				`https://api.yelp.com/v3/businesses/search?latitude=${region.latitude}&longitude=${region.longitude}`, {
					method: 'GET',
					headers: {
						'Authorization': YELP_AUTH
					}
				})).json()
			dispatch({type: FETCH_RESTAURANTS, payload: restaurants});
			callback();
		} catch(e) {
			console.log(e);
		}
};