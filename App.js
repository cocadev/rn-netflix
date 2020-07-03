import './src/common/fixtimerbug'; // <<<<<<<<<<<<<<<<<<

import React, { Component } from 'react';
import { YellowBox, View, StyleSheet } from 'react-native';
import { Routers } from './src/routers';
import firebase from 'firebase';
import { configureStore } from './src/store';
import { Provider } from 'react-redux';

YellowBox.ignoreWarnings([
	'Warning: componentWillMount',
	'Warning: componentWillReceiveProps',
	'VirtualizedLists should'
]);

var firebaseConfig = {
    apiKey: "AIzaSyDefdNXOpbNOW0Gp4wfuOwfUhvg8GYta6I",
    authDomain: "booster-mobile-app-adsrecon.firebaseapp.com",
    databaseURL: "https://booster-mobile-app-adsrecon.firebaseio.com",
    projectId: "booster-mobile-app-adsrecon",
    storageBucket: "booster-mobile-app-adsrecon.appspot.com",
    messagingSenderId: "898957395374",
    appId: "1:898957395374:web:08ea19e74b3d16bf9a343f",
    measurementId: "G-5ENQJLCKQT"
};

firebase.initializeApp(firebaseConfig);

const { store } = configureStore();

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					<Routers />
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
