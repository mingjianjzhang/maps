import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { facebookLogin } from '../actions';

class AuthScreen extends Component {
	componentDidMount(){
		// AsyncStorage.removeItem('fb_token');
		this.props.facebookLogin();
	}
	componentWillReceiveProps(nextProps){
		console.log("receiving props....");
		this.onAuthComplete(nextProps)
	}
	onAuthComplete(props) {
		console.log(props, "here are my props");
		if (props.token){
			this.props.navigation.navigate('map');
		}
	}
	render(){
		return (
			<View />
		)
	}
}

function mapStateToProps({ auth }) {
	return { token: auth.token }
}


export default connect(mapStateToProps, { facebookLogin })(AuthScreen)