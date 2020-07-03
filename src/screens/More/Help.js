import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/header';
import { File, Out } from '../../components/Icons';

export default class HelpScreen extends Component {
	render() {
		const { navigation } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
				<Header title={'Help'} onGoBack={() => this.props.navigation.goBack()} />
				<ScrollView>
					<View style={styles.box}>
						<TouchableOpacity
							style={styles.line}
							onPress={() => navigation.navigate('Demo', { title: 'How To' })}
						>
							<File />
							<Text style={styles.h2}>How To</Text>
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
