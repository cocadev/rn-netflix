import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../common/colors';
import Header from '../../components/header';

export default class AccountScreen extends Component {
  render() {
    return (
			<View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
        <Header title={'My Accounts'} onGoBack={()=>this.props.navigation.goBack()}/>
        <View style={styles.more}>
          <View style={styles.box}>
            <Text style={styles.h2}>Full Name</Text>
            <TextInput style={styles.textinput}/>
          </View>
          <View style={styles.box}>
            <Text style={styles.h2}>Address</Text>
            <TextInput style={styles.textinput}/>
          </View>
          <View style={styles.box}>
            <Text style={styles.h2}>Zip</Text>
            <TextInput style={styles.textinput}/>
          </View>
          <View style={styles.box}>
            <Text style={styles.h2}>City</Text>
            <TextInput style={styles.textinput}/>
          </View>
          <View style={styles.box}>
            <Text style={styles.h2}>Country</Text>
            <TextInput style={styles.textinput}/>
          </View>
          <View style={styles.box}>
            <Text style={styles.h2}>Bank Account</Text>
            <TextInput style={styles.textinput}/>
          </View>
          <View style={styles.box}>
            <Text style={styles.h2}>Swift Code</Text>
            <TextInput style={styles.textinput}/>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
	header: {
    flexDirection: 'row',
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
    backgroundColor: '#15110D',
		elevation: 3
  },
  h1: {
    lineHeight: 30,
		fontSize: 18,
		marginLeft: 10,
		color: '#FFF'
  },
  h2: {
    width: 80,
    lineHeight: 18,
		fontSize: 16,
		marginLeft: 8,
		color: '#FFF'
  },
  textinput: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    flex: 1,
    height: 40,
    marginLeft: 20,
    marginRight: 4,
    marginTop: 2,
    paddingLeft: 12,
    color: '#fff',
    fontSize: 18
  },
  box: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center'
  },
  btn: {
    
    borderWidth: 3,
    borderColor: colors.DARK,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 20
  },
  btnText: {
		fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  }
})