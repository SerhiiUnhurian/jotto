import { actionTypes } from '../actions';

const successReducer = (state = false, action) => {
  if (action.type !== actionTypes.CORRECT_GUESS) {
    return state;
  }
  return true;
};

export default successReducer;
