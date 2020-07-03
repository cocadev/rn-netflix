import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../common/colors';

export function Home(props) {
	const { color } = props
	return <MaterialIcons name="home" size={25} color={color ? color : colors.WHITE} />;
}
export function Search(props) {
	const { small, color } = props;
	return <Feather name="search" size={25} color={small ? '#b2b2b2' : (color ? color: colors.WHITE)} style={{ marginHorizontal: 10}}/>;
}
export function Coming(props) {
	const { color } = props
	return <Feather name="youtube" size={25} color={color ? color : colors.WHITE} />;
}
export function Download(props) {
	const { color } = props
	return <MaterialIcons name="file-download" size={25} color={color ? color : colors.WHITE} />;
}
export function More(props) {
	const { color } = props
	return <MaterialIcons name="view-headline" size={25} color={color ? color : colors.WHITE} />;
}
export function Heart() {
	return <MaterialCommunityIcons name="heart" size={45} color={'#b71c1c'} style={{ marginRight: 6 }} />;
}
export function Thumb() {
	return <FontAwesome name="thumbs-o-up" size={45} style={{ marginRight: 6 }} color={'#B2B2B2'}/>;
}
export function Emoji() {
	return <Entypo name="emoji-happy" size={45} color={colors.WHITE} style={{ marginRight: 6 }} />;
}
export function Mic() {
	return <MaterialIcons name="mic" size={27} style={{ marginHorizontal: 10 }} color={'#B2B2B2'}/>;
}
export function Wifi() {
	return <MaterialIcons name="wifi" size={27} style={{ marginHorizontal: 10 }} color={'#B2B2B2'}/>;
}
export function Alarm() {
	return <MaterialCommunityIcons name="bell-ring" size={27} style={{ marginHorizontal: 10 }} color={'#B2B2B2'}/>;
}
export function File() {
	return <Feather name="file-text" size={27} style={{ marginHorizontal: 10 }} color={'#B2B2B2'}/>;
}
export function Out() {
	return <Feather name="log-out" size={27} style={{ flex: 1, textAlign: 'right' }} color={'#B2B2B2'}/>;
}
export function SwitchOn() {
	return <Entypo name="switch" size={27} style={{ flex: 1, textAlign: 'right' }} color={'#B2B2B2'}/>;
}
export function RoundHeart() {
	return (
		<View style={styles.roundHeart}>
			<MaterialCommunityIcons name="heart" size={32} color={'#b71c1c'} />
		</View>
	);
}
export function RoundADD() {
	return (
		<MaterialIcons name="add-circle-outline" size={45} color={'#B2B2B2'} style={{ marginRight: 4}}/>
	);
}

const styles = StyleSheet.create({
	roundHeart: {
		position: 'absolute',
		top: 195,
		right: 12,
		backgroundColor: '#fff',
		borderRadius: 20,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
