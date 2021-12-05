import axios from 'axios';
import { getLetterMatchCount } from '../helpers/index';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  RESET_GAME: 'RESET_GAME',
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

export const getSecretWord = () => {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:3030');
    const secretWord = response.data;
    dispatch({ type: actionTypes.SET_SECRET_WORD, payload: secretWord });

    // return axios.get('http://localhost:3030').then((response) => {
    //   const secretWord = response.data;
    //   dispatch({
    //     type: actionTypes.SET_SECRET_WORD,
    //     payload: secretWord,
    //   });
    // });
  };
};

// export const setSecretWord = (secretWord) => {
//   return { type: actionTypes.SET_SECRET_WORD, payload: secretWord };
// };

export const resetGame = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_GAME });
    dispatch(getSecretWord());
  };
};
