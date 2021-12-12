import { actionTypes } from '../actions/index';

const enterSecretWordReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.ENTERING_SECRET_WORD:
      return action.payload;
    case actionTypes.RESET_GAME:
      return false;
    default:
      return state;
  }
};

export default enterSecretWordReducer;
