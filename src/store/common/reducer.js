import * as types from "./actionTypes";
import _ from 'underscore';

const initialState = {
  homeData: null,
};


export default function common(state = initialState, action = {}) {
  switch (action.type) {

    case types.GET_ADS:

      return {
        ...state,
        type: types.GET_ADS,
        homeData: action.data,
      }

    default:
      return state;
  }
}
