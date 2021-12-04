import { actionTypes } from '../actions';

const successReducer = (state = false, action) => {
  if (action.type === actionTypes.CORRECT_GUESS) {
    return true;
  }
  return state;
};

export default successReducer;
