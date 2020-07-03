import React, { Component } from 'react';
import { View, StyleSheet, TextInput, FlatList, Image, Text } from 'react-native';
import { Search, Mic } from '../components/Icons';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

export default class SearchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: null,
			isLoading: true
		};
	}

	componentDidMount() {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=f3e9f7d1677c7aa63c9ab526381eeceb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3`;

		this.setState({ loading: true });
		return fetch(url)
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					dataSource: response.results,
					isLoading: false
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	_renderItem({ item, index }) {
		return (
			<Collapse key={index}>
				<CollapseHeader style={styles.board}>
					<Image
						source={{ uri: 'https://image.tmdb.org/t/p/w185/' + item.backdrop_path }}
						style={styles.Img}
						resizeMode="cover"
					/>
					<Text style={styles.h1}>{item.original_title}</Text>
				</CollapseHeader>
				<CollapseBody>
					<Image
						source={{ uri: 'https://image.tmdb.org/t/p/w185/' + item.backdrop_path }}
						style={styles.ImgFull}
						resizeMode="cover"
					/>
					<Text style={styles.h1}>{item.overview}</Text>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.btn}>
							<Text style={styles.h1}>View</Text>
						</View>
						<View style={styles.btn}>
							<Text style={styles.h1}>Like</Text>
						</View>
					</View>
				</CollapseBody>
			</Collapse>
		);
	}
	renderHeader() {
		return <Text style={styles.h2}>{'Latest ads from TV channels'}</Text>;
	}
	render() {
		const { dataSource, isLoading } = this.state;
		return (
			<View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
				<View style={styles.header}>
					<Search small />
					<TextInput style={styles.textinput} placeholder="Search by category, brands" />
					<Mic />
				</View>
				<FlatList
					data={dataSource}
					keyExtractor={(item, i) => String(i)}
					numColumns={1}
					ItemSeparatorComponent={this.renderSeparator}
					ListHeaderComponent={this.renderHeader}
					renderItem={(item) => this._renderItem(item, this.props)}
					extraData={this.state}
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
		height: 30,
		padding: 0,
		paddingLeft: 6
	},
	board: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 2,
		backgroundColor: '#15110D',
		elevation: 3
	},
	Img: {
		width: 100,
		height: 70,
		resizeMode: 'contain',
		backgroundColor: 'lightgrey'
	},
	ImgFull: {
		width: '100%',
		height: 260,
		resizeMode: 'contain',
    backgroundColor: 'lightgrey',
    marginBottom: 6,
	},
	h1: {
		fontSize: 15,
		marginLeft: 8,
		color: '#FFF'
	},
	h2: {
		fontSize: 15,
		marginLeft: 8,
		color: '#FFF',
		marginVertical: 10,
		fontWeight: 'bold',
		fontSize: 18
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
	}
});
