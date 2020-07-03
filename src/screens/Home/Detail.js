import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import Header from '../../components/header';
import api from '../../api';

export default class DetailScreen extends Component {
	constructor() {
		super();
		this.state = {
			timer: 0
		};
	}

	componentDidMount() {
		this.interval = setInterval(() => this.setState({ timer: this.state.timer + 1 }), 1000);
		this.focusListner = this.props.navigation.addListener('willBlur', () => {
			this.setState({ timer: 0 });
			this.onRequest();
		});
		this.focusListner2 = this.props.navigation.addListener('didFocus', () => {
			this.setState({ timer: 0 });
		});
	}
	componentWillUnmount() {
		clearInterval(this.interval);
		this.focusListner.remove();
		this.focusListner2.remove();
	}

	onRequest() {
		const item = this.props.navigation.getParam('item');
		const { timer } = this.state;
		this.setState({ isWaiting: true });
		api.onRequestCounts(item.ad_id, timer, new Date(), 1, (res, err) => {
			console.log('res', res);
		});
	}

	render() {
		const item = this.props.navigation.getParam('item');
		return (
			<View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
				<Header
					title={'AD Detail'}
					onGoBack={() => {
						this.props.navigation.goBack();
					}}
				/>
				<Image source={{ uri: item.image[0] }} style={styles.img} />
				<View style={{ flex: 1 }}>
					<ScrollView>
						<View style={styles.line}>
							<Text style={styles.h1}>Description</Text>
							<Text style={styles.h2}>{item.ad_description}</Text>
							<Text style={styles.h1}>Counting</Text>
							<Text style={styles.h2}>{this.state.timer}</Text>
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	h1: {
		fontSize: 30,
		marginLeft: 8,
		color: '#FFF',
		fontFamily: 'BlackOpsOne-Regular',
		marginTop: 20
	},
	h2: {
		lineHeight: 18,
		fontSize: 16,
		marginLeft: 8,
		color: '#FFF'
	},
	line: {
		paddingVertical: 12,
		paddingRight: 8,
		marginTop: 3
	},
	img: {
		width: '100%',
		height: 250
	}
});
