import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk';

const initialState = {
  success: false,
  secretWord: null,
  guessedWords: [],
};

export const middlewares = [ReduxThunk];

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);
