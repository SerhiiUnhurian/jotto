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

test('should return new state for known action', () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});
