import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { 
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL
} from './types';


// AsyncStorage Basic Methods
// AsyncStorage.setItem('key', value);
// AsyncStorage.getItem('key');

export const facebookLogin = () => async (dispatch) => {
	console.log("am I even happening???");
	let token = await AsyncStorage.getItem('fb_token');
	if (token) {
		dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token})
	} else {
		doFacebookLogin(dispatch);
	}
}	

const doFacebookLogin = async(dispatch) => {
	let { type, token } = await Facebook.logInWithReadPermissionsAsync('1969462730005821', {
		permissions: ['public_profile']
	});
	console.log(token, "perhaps my facebook token will show here");
	if (type === 'cancel') {
		return dispatch({type: FACEBOOK_LOGIN_FAIL})
	}
	await AsyncStorage.setItem('fb_token', token);
	dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
};