import { GET_HEALTH, GET_DOCS } from '../constants/actiontypes';

export default function api(state={}, action) {
  switch (action.type) {
    case GET_HEALTH:
      return {
        ...state,
        health: action.payload.message,
        blockNumber: action.payload.blockNumber,
      }
    case GET_DOCS:
      return {
        ...state,
        endpoints: action.payload
      }
    default:
      return state;
  }
}