import { actionTypes } from '../actions';

const successReducer = (state = false, action) => {
  if (action.type === actionTypes.CORRECT_GUESS) {
    return true;
  } else if (action.type === actionTypes.RESET_GAME) {
    return false;
  }
  return state;
};

export default successReducer;
