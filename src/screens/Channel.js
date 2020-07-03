import React, { Component } from 'react';
import { View, StyleSheet, TextInput, FlatList, Image, Text } from 'react-native';
import { Search } from '../components/Icons';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import api from '../api';

export default class ChannelScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			COUNTRIES: [ 'SK' ],
			cca2: 'SK',
			televisions: [],
			countryName: null,
			isLoading: true
		};
	}

	componentDidMount() {
		api.getAllCountries((err, res) => {
			res && this.setState({ countryName: res.countries[0] });
		});
		api.getAllTV((err, res) => {
			res && this.setState({ televisions: res });
		});
	}

	_renderItem({ item, index }) {
		return (
			<View key={index}>
				<View style={styles.board}>
					<Image
						source={{ uri: 'https://mobile.adsrecognition.com/' + item.logo }}
						style={styles.Img}
						resizeMode="cover"
					/>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}
					>
						<Text style={styles.h1}>{item.radioname}</Text>
						<Text style={styles.h3}>{!item.fav ? 'ADD TO FAVORITE' : 'REMOVE FROM FAVORITE'}</Text>
					</View>
				</View>
			</View>
		);
	}

	render() {
		const { televisions, isLoading, COUNTRIES } = this.state;
		return (
			<View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
				<View style={styles.header}>
					<Search small />
					<TextInput style={styles.textinput} placeholder="TV Channel" />
				</View>
				<Text style={styles.h2}>Select Country</Text>
				<FlatList
					data={televisions}
					keyExtractor={(item, i) => String(i)}
					numColumns={1}
					ItemSeparatorComponent={this.renderSeparator}
					ListHeaderComponent={
						<View style={styles.country}>
							<CountryPicker
								theme={DARK_THEME}
								countryCodes={COUNTRIES}
								countryCode={this.state.cca2}
								translation="eng"
								withAlphaFilter
								withFilter
								withFlag
								onSelect={(value) => {
									this.setState({ cca2: value.cca2, countryName: value.name });
								}}
							/>
							<Text style={styles.h1}>{this.state.countryName}</Text>
						</View>
					}
					renderItem={(item) => this._renderItem(item, this.props)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		backgroundColor: '#2E2E2E',
		justifyContent: 'center',
		alignItems: 'center',
		height: 42
	},
	textinput: {
		flex: 1,
		backgroundColor: '#fff',
		marginRight: 12,
		height: 30,
		padding: 0,
		paddingLeft: 6
	},
	board: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingRight: 12,
		marginVertical: 2,
		backgroundColor: '#15110D',
		elevation: 3
	},
	Img: {
		width: 60,
		height: 60,
		marginLeft: 12,
		marginRight: 18,
		resizeMode: 'contain',
		backgroundColor: 'lightgrey'
	},
	ImgFull: {
		width: '100%',
		height: 260,
		resizeMode: 'contain',
		backgroundColor: 'lightgrey',
		marginBottom: 6
	},
	h1: {
		fontSize: 15,
		marginLeft: 8,
		color: '#FFF'
	},
	h2: {
		fontSize: 15,
		marginTop: 22,
		marginBottom: 0,
		marginLeft: 12,
		color: '#FFF',
		marginVertical: 10,
		fontWeight: 'bold',
		fontSize: 18
	},
	h3: {
		fontSize: 10,
		marginLeft: 8,
		color: '#FFF'
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
		borderRadius: 4,
		flex: 1,
		margin: 3,
		borderWidth: 1,
		borderColor: 'lightgrey'
	},
	country: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 12,
		marginBottom: 18
	}
});
