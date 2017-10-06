import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import { Button } from 'react-native-elements';
var formurlencoded = require('form-urlencoded');

import { fetchRestaurants } from '../actions'

class MapScreen extends Component {

	state = { 
		errorMessage: '',
		region: null,
		apiKey: '4201738803816157',
		restaurants: [],
		initialRegion: null
	}

	componentWillMount(){
		// 9iiYOBpNPuVPrCupfvvBdw
		// MTs2dodKZSm6pgZcVsW8whvhFkmzHiukteWcPLxCEjlVxOIMlg7M1gg5Jtuuxs1D
		this.getLocationAsync();
	}

	componentWillReceiveProps(nextProps){
		console.log("receiving new props!!!");
		this.setState({restaurants: nextProps.restaurants})
	}
	renderRestaurantMarkers(){
		return this.state.restaurants.map(restaurant => {
			return (
				<MapView.Marker
					key={restaurant.id}
					coordinate={restaurant.coordinates}
					title={restaurant.name}
					description={restaurant.phone}
				/>
			)
		})
	}
	onButtonPress = () => {
		this.props.fetchRestaurants(this.state.region, () => {
			console.log("am i navigating?");
			this.props.navigation.navigate('deck')
		})

	}
	getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			})
		}
		let { coords } = await Location.getCurrentPositionAsync({});
		console.log(coords);
		this.setState({
			region: {
				latitude: coords.latitude,
				longitude: coords.longitude,
				longitudeDelta: 0.04,
				latitudeDelta: 0.09
			},
			initialRegion: {
				latitude: coords.latitude,
				longitude: coords.longitude
			}
		})
	}

	onRegionChangeComplete = (region) => {
		this.setState({ region })
	}
	render(){
		if (!this.state.region || !this.state.initialRegion){
			return (
				<View style = {{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator size="large" />
				</View>
			)
		}
		return (
			<View style={{ flex: 1 }}>
				<MapView
					style={{ flex: 1 }}
					region={this.state.region}
					onRegionChangeComplete={this.onRegionChangeComplete}
				>
					<MapView.Marker
						pinColor='#66B7AB'
						coordinate={this.state.initialRegion}
						title="Home"
						description="Help Me!"
					/>
					{this.renderRestaurantMarkers()}
				</MapView>
				<View style={styles.buttonContainer}>
					<Button
						large
						title="Find Nearby Restaurants"
						backgroudnColor="#009688"
						icon={{ name: 'search' }}
						onPress={this.onButtonPress}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		bottom: 30,
		left: 0,
		right: 0
	}
})

function mapStateToProps({ yelp }){
	return {
		restaurants: yelp.restaurants
	}
}
export default connect(mapStateToProps, { fetchRestaurants })(MapScreen)