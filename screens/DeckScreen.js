import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { MapView, LinearGradient } from 'expo';
import { Card, Button } from 'react-native-elements';

import Swipe from '../components/Swipe';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class DeckScreen extends Component {
	renderCard(restaurant){
		return (
			<Card title={restaurant.name}>
				<View style={styles.detailWrapper}>
					<Text>Rating: {restaurant.rating} stars </Text>
					<Text>Price: {restaurant.price} </Text>
				</View>
				<Text>
					Address: {restaurant.location.display_address[0]}, {restaurant.location.display_address[1]}
				</Text>
			</Card>
		)
	}

	renderNoMoreCards(){
		return (
			<Card title="No more restaurants">
			</Card>
		)
	}
	render(){
		return (
			<View style={styles.testStyle}>
					<MapView
						style={{flex: 1}}
						initialRegion={{
				      latitude: 37.78825,
				      longitude: -122.4324,
				      latitudeDelta: 0.0922,
				      longitudeDelta: 0.0421,
				    }}
					>
					</MapView>
					<ScrollView 
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						style={styles.scrollCards}>
						<View style={styles.slideStyle}>
							<LinearGradient
								colors={['#1CBDD4', '#45BEDC', '#D4C1E0']}
								style={styles.gradientStyle}
								>
								<Text> My Face is Ugly </Text>
							</LinearGradient>
						</View>
						<View style={styles.slideStyle}>
														<LinearGradient
								colors={['#B95B4E', '#EB9972', '#EAC282']}
								style={styles.gradientStyle}
								>
								<Text> My Face is blue </Text>
							</LinearGradient>
						</View>
						<View style={styles.slideStyle}>
														<LinearGradient
								colors={['#54B2AD', '#66B7AB', '#B3DBC0']}
								style={styles.gradientStyle}
								>
								<Text> My Face is red </Text>
							</LinearGradient>
						</View>
					</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	screenContainer: {
		height: SCREEN_HEIGHT,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'blue'
	},
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10
	},
	scrollCards: {
		position: 'absolute',
		bottom: 100,
	},
	mapContainer: {
		height: 300,
		backgroundColor: 'yellow'
	},
	testStyle: {
		flex: 1
	},
	slideStyle: {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT/3,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	gradientStyle: {
		width: '80%',
		height: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

function mapStateToProps({ yelp }){
	return { restaurants: yelp.restaurants }
}

export default connect(mapStateToProps)(DeckScreen)