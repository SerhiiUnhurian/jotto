import { combineReducers } from "redux";
import successReducer from "./successReducer";
import guessedWordsReducer from "./guessedWordsReducer";
import secretWordReducer from "./secretWordReducer";
import gaveUpReducer from "./gaveUpReducer";
import enterSecretWordReducer from "./enterSecretWordReducer";
import serverErrorReducer from "./serverErrorReducer";

export default combineReducers({
  serverError: serverErrorReducer,
  success: successReducer,
  gaveUp: gaveUpReducer,
  guessedWords: guessedWordsReducer,
  secretWord: secretWordReducer,
  enterSecretWord: enterSecretWordReducer,
});
