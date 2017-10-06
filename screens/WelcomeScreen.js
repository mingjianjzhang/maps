import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDES_DATA = [
	{text: 'Welcome to Job App', colors: ['#1CBDD4', '#45BEDC', '#D4C1E0']},
	{text: "Use this to get a job", colors: ['#B95B4E', '#EB9972', '#EAC282']},
	{text: 'Set your location, then swipe away!', colors: ['#54B2AD', '#66B7AB', '#B3DBC0']}
]
class WelcomeScreen extends Component {
	state = { token: null }

	async componentWillMount(){
		let token = await AsyncStorage.getItem('fb_token')
		if (token) {
			this.props.navigation.navigate('map');
		} else {
			this.setState({ token: false })
		}
	}

	onSlidesComplete = () => {
		const { navigate } = this.props.navigation;
		navigate('auth');
	}
	render(){
		if (_.isNull(this.state.token)) {
			return <AppLoading />
		}
		return (
			<Slides
				data={SLIDES_DATA} 
				onComplete={this.onSlidesComplete}
			/>
		)
	}
}

export default WelcomeScreen