import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';


class DeckScreen extends Component {

	render(){
		return (
			<View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10
	}
})

function mapStateToProps({ yelp }){
	return { restaurants: yelp.restaurants }
}

export default connect(mapStateToProps)(DeckScreen)