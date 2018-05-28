import { TOGGLE_EXPAND } from '../constants/actiontypes';

export function expandSchema(uri) {
  return dispatch => {
    dispatch({
      type: TOGGLE_EXPAND,
      payload: 'request-schema-' + uri
    });
  };
}