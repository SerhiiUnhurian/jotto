import { combineReducers } from 'redux';
import successReducer from './successReducer';
import guessedWordsReducer from './guessedWordsReducer';
import secretWordReducer from './secretWordReducer';
import gaveUpReducer from './gaveUpReducer';

export default combineReducers({
  success: successReducer,
  gaveUp: gaveUpReducer,
  guessedWords: guessedWordsReducer,
  secretWord: secretWordReducer,
});
