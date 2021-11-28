import axios from 'axios';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
};

// action creators
export const correctGuess = () => {
  return { type: actionTypes.CORRECT_GUESS };
};

export const getSecretWord = () => {
  // TODO: Update to test App in Redux / Context sections
  return axios.get('http://localhost:3030').then((response) => {
    return response.data;
  });
};
