import axios from 'axios';
import { getLetterMatchCount } from '../helpers/index';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  RESET_GAME: 'RESET_GAME',
  GIVE_UP: 'GIVE_UP',
  // SECRET_WORD_ENTERING: 'SECRET_WORD_ENTERING',
  // SECRET_WORD_ENTERED: 'SECRET_WORD_ENTERED',
  ENTERING_SECRET_WORD: 'ENTERING_SECRET_WORD',
};

// action creators

// TODO: remove
export const correctGuess = () => {
  return { type: actionTypes.CORRECT_GUESS };
};

export const guessWord = (guessedWord) => {
  return (dispatch, getState) => {
    const { secretWord } = getState();

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: {
        guessedWord,
        letterMatchCount: getLetterMatchCount(guessedWord, secretWord),
      },
    });

    if (guessedWord === secretWord) {
      dispatch(correctGuess());
    }
  };
};

export const setSecretWord = (secretWord) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_SECRET_WORD, payload: secretWord });
    dispatch(setEnterSecretWord(false));
  };
};

export const getSecretWord = () => {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:3030');
    const secretWord = response.data;
    dispatch(setSecretWord(secretWord));

    // return axios.get('http://localhost:3030').then((response) => {
    //   const secretWord = response.data;
    //   dispatch({
    //     type: actionTypes.SET_SECRET_WORD,
    //     payload: secretWord,
    //   });
    // });
  };
};

export const resetGame = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_GAME });
    dispatch(getSecretWord());
  };
};

export const giveUp = () => {
  return { type: actionTypes.GIVE_UP };
};

export const setEnterSecretWord = (isEntering) => {
  return { type: actionTypes.ENTERING_SECRET_WORD, payload: isEntering };
};
