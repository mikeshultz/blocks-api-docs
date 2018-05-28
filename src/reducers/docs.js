import { TOGGLE_EXPAND } from '../constants/actiontypes';

export default function infura(state={}, action) {
  switch (action.type) {
    case TOGGLE_EXPAND:
      const newState = {
        ...state,
      };
      newState.expand[action.payload] = !state.expand[action.payload];
      return newState;
    default:
      return state;
  }
}