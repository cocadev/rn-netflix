import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../common/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Header extends Component {
	render() {
		const { title, onGoBack } = this.props;
		return (
			<View style={styles.header}>
				<MaterialIcons
					name="arrow-back"
					size={27}
					style={{ marginLeft: 0 }}
					color={colors.WHITE}
					onPress={() => onGoBack()}
				/>
				<Text style={styles.h1}>{title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		padding: 6,
		borderColor: 'lightgrey',
		backgroundColor: '#15110D',
		alignItems: 'center',
		elevation: 3
	},
	h1: {
		lineHeight: 30,
		fontSize: 18,
		marginLeft: 10,
		color: '#FFF'
	}
});
