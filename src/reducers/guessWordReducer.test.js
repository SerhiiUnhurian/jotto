import { actionTypes } from '../actions';
import guessedWordsReducer from './guessedWordsReducer';

test('should return empty array for `RESET_GAME` action', () => {
  const initialState = [{ gussedWord: 'train', letterMatchCount: 3 }];
  const newState = guessedWordsReducer(initialState, {
    type: actionTypes.RESET_GAME,
  });
  expect(newState).toEqual([]);
});
