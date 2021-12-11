import { actionTypes } from '../actions/index';

const gaveUpReducer = (state = false, action) => {
  if (action.type === actionTypes.GIVE_UP) {
    return true;
  } else if (action.type === actionTypes.RESET_GAME) {
    return false;
  }
  return state;
};

export default gaveUpReducer;
