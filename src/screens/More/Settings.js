import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/header';
import { Wifi, Alarm, File, Out, SwitchOn } from '../../components/Icons';

export default class SettingsScreen extends Component {
	render() {
		const { navigation } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
				<Header title={'App Settings'} onGoBack={() => this.props.navigation.goBack()} />
				<ScrollView>
					<View style={styles.box}>
						<Text style={styles.h1}>Downloads</Text>
						<View style={styles.line}>
							<Wifi />
							<Text style={styles.h2}>Wi-Fi Only</Text>
							<SwitchOn />
						</View>
						<Text style={styles.h1}>Notifications</Text>
						<View style={styles.line}>
							<Alarm />
							<Text style={styles.h2}>Allow Notifications</Text>
							<SwitchOn />
						</View>
						<Text style={styles.h1}>Legal</Text>
						<TouchableOpacity
							style={styles.line}
							onPress={() => navigation.navigate('Demo', { title: 'Open Source Licenses' })}
						>
							<File />
							<Text style={styles.h2}>Open Source Licenses</Text>
							<Out />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.line}
							onPress={() => navigation.navigate('Demo', { title: 'Privacy' })}
						>
							<File />
							<Text style={styles.h2}>Privacy</Text>
							<Out />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.line}
							onPress={() => navigation.navigate('Demo', { title: 'Cookie Preferences' })}
						>
							<File />
							<Text style={styles.h2}>Cookie Preferences</Text>
							<Out />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.line}
							onPress={() => navigation.navigate('Demo', { title: 'Terms of Use' })}
						>
							<File />
							<Text style={styles.h2}>Terms of Use</Text>
							<Out />
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	more: {
		margin: 12
	},
	h1: {
		lineHeight: 30,
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 10,
		color: '#FFF',
		marginTop: 18
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
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#15110D',
		paddingVertical: 12,
		paddingRight: 8,
		marginTop: 3
	}
});
