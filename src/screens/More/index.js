import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

export default class MoreScreen extends Component {
  render() {
    return (
			<View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
        <View style={styles.header}>
          <Text style={styles.h1}>Dominik Account</Text>
          <Text style={styles.h1}>Your bonus: 150</Text>
          <Text style={styles.h1}>Your level: beginner</Text>
          <Image source={{ uri: 'https://www.trzcacak.rs/myfile/detail/314-3147079_ducks-clip-art-transprent-png-free-download-cute.png'}} style={styles.img}/>
        </View>
        <View style={styles.more}>
          <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('Account')}>
            <Text style={styles.h2}>ACCOUNT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('Settings')}>
            <Text style={styles.h2}>APP SETTINGS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('Help')}>
            <Text style={styles.h2}>HELP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('Bonus')}>
            <Text style={styles.h2}>CHOOSE YOUR BONUS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.h2}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
	header: {
    margin: 12,
    marginTop: 18,
    padding: 4,
    borderColor: 'lightgrey',
    backgroundColor: '#15110D',
    alignItems: 'center',
		elevation: 3
  },
  more: {
    flex: 1,
    margin: 12,
		elevation: 3
  },
  h1: {
    lineHeight: 30,
		fontSize: 15,
		marginLeft: 8,
		color: '#FFF'
  },
  h2: {
    lineHeight: 30,
    fontWeight: 'bold',
		fontSize: 20,
		marginLeft: 8,
		color: '#FFF'
  },
  img: {
    width: 38,
    height: 38,
    marginVertical: 5,
    backgroundColor: 'lightgrey'
  },
  btn: {
    elevation: 2,
    padding: 12,
    backgroundColor: '#15110D',
    borderBottomColor: '#0D0D0D',
    borderBottomWidth: 4
  }
})