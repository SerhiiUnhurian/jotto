import { actionTypes } from "../actions";

const serverErrorReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SERVER_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default serverErrorReducer;
