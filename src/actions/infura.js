import { GET_INFURA_BLOCK_NUMBER } from '../constants/actiontypes';
import * as infura from '../lib/infura';

export function getBlockNo() {
  return dispatch => {
    return infura.getBlockNo().then(
      response => {
        dispatch({
          type: GET_INFURA_BLOCK_NUMBER,
          payload: response,
        });
      }
    );
  };
}