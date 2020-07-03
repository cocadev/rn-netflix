import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Header from '../../components/header';

export default class DemoScreen extends Component {
	render() {
		const title = this.props.navigation.getParam('title')
		return (
			<View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
				<Header title={title} onGoBack={() => this.props.navigation.goBack()} />
				<ScrollView>
					<View style={styles.box}>
						<View style={styles.line}>
							<Text style={styles.h1}>[Comming Soon]</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	h1: {
		fontSize: 30,
		marginLeft: 8,
		color: '#FFF',
		fontFamily: 'BlackOpsOne-Regular'
	},
	h2: {
		lineHeight: 18,
		fontSize: 16,
		marginLeft: 8,
		color: '#FFF'
	},
	box: {
		margin: 12
	},
	line: {
		backgroundColor: '#15110D',
		paddingVertical: 12,
		paddingRight: 8,
		marginTop: 3
	}
});
