import successReducer from './successReducer';
import { actionTypes } from '../actions/index';

test('should return default state', () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test('should return previous state for unknown action', () => {
  const newState = successReducer(false, { type: 'UNKNOWN' });
  expect(newState).toBe(false);
});

test('should return `true` for `CORRECT_GUESS` action', () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});

test('should return `false` for `RESET_GAME` action', () => {
  const newState = successReducer(true, { type: actionTypes.RESET_GAME });
  expect(newState).toBe(false);
});
