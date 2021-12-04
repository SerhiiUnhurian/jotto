import { actionTypes } from '../actions/index';

const secretWordReducer = (state = '', action) => {
  if (action.type === actionTypes.SET_SECRET_WORD) {
    return action.payload;
  }
  return state;
};

export default secretWordReducer;
