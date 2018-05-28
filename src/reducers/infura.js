import { GET_INFURA_BLOCK_NUMBER } from '../constants/actiontypes';

export default function infura(state={}, action) {
  switch (action.type) {
    case GET_INFURA_BLOCK_NUMBER:
      return {
        ...state,
        blockNumber: action.payload,
      }
    default:
      return state;
  }
}