import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";

export const initialState = {
  serverError: null,
  success: false,
  gaveUp: false,
  secretWord: null,
  guessedWords: [],
  enterSecretWord: false,
};

export const middlewares = [ReduxThunk];

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);
