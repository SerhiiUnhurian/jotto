import axios from 'axios';
import { getLetterMatchCount } from '../helpers/index';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
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
  // TODO: Update to test App in Redux / Context sections
  return axios.get('http://localhost:3030').then((response) => {
    return response.data;
  });
};
