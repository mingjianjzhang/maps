import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import { Button } from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width
class Slides extends Component { 

	renderLastSlide(index){
		if (index === this.props.data.length -1) {
			return ( 
				<Button 
					buttonStyle={styles.buttonStyle}
					title="Onwards!"
					raised
					onPress={this.props.onComplete}
				/>
			)
		}
	}
	renderSlides(){
		return this.props.data.map((slide, index) => {
			return (
				<View style={styles.slide} key={ slide.text }>
					 <LinearGradient
					          colors={slide.colors}
					          style={styles.gradientStyle}
					 >
						<Text style={styles.slideText}>{ slide.text }</Text>
						{this.renderLastSlide(index)}
					</LinearGradient>
				</View>
			)
		})
	}

	render() {
		return (
			<ScrollView
				horizontal
				pagingEnabled
				style={{ flex: 1 }}
			>
				{this.renderSlides()}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	slide: {
		width: SCREEN_WIDTH,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	gradientStyle: {
		width: '100%',
		height: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	slideText: {
		fontSize: 30,
		textAlign: 'center',
		color: '#FFFFFF',
		marginBottom: 15
	},
	buttonStyle: {
		backgroundColor: '#1CBDD4'
	}
})

export default Slides;