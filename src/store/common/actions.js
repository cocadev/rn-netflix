import * as types from './actionTypes';
import firebase from 'firebase';

export function loadAdvertises() {
  return async dispatch => {
    new Promise(function (resolve, reject) {
      firebase.database().ref(`/homepage/2/34`).on("value", function async(snapshot) {
            var mydata = snapshot.val();
            dispatch({ type: types.GET_ADS, data: mydata });
            resolve(true)
      })
    })
  }
}