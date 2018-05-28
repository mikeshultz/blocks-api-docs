import { GET_DOCS, GET_HEALTH } from '../constants/actiontypes';
import * as api from '../lib/api';

export function getHealth() {
  return dispatch => {
    return api.getHealth().then(
      response => {
        dispatch({
          type: GET_HEALTH,
          payload: response,
        });
      }
    );
  };
}

export function getDocs() {
  return dispatch => {
    return api.docs().then(
      response => dispatch({
        type: GET_DOCS,
        payload: response,
      })
    );
  }
}