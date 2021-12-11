import gaveUpReducer from './gaveUpReducer';
import { actionTypes } from '../actions/index';

test('should return default state', () => {
  const newState = gaveUpReducer(undefined, {});
  expect(newState).toBe(false);
});

test('should return previous state for unknown action', () => {
  const newState = gaveUpReducer(false, { type: 'UNKNOWN' });
  expect(newState).toBe(false);
});

test('should return `true` for `GIVE_UP` action', () => {
  const newState = gaveUpReducer(false, { type: actionTypes.GIVE_UP });
  expect(newState).toBe(true);
});

test('should return `false` for `RESET_GAME` action', () => {
  const newState = gaveUpReducer(true, { type: actionTypes.RESET_GAME });
  expect(newState).toBe(false);
});
