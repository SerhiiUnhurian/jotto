import { mount } from 'enzyme';
import App from './App';
import { findByTestAttr } from '../test/testUtils';

/**
 * Functional tests for App components
 */

/**
 * Creates wrapper with specified conditions,
 * then submits a guessed word of 'train'
 * @param {object} state - Initial State
 * @returns {Wrapper} - Enzyme wrapper of mounted App component
 */
const setup = (state = {}) => {
  //TODO: Apply state
  const wrapper = mount(<App />);

  const input = findByTestAttr(wrapper, 'input');
  input.simulate('change', { target: { value: 'train' } });

  const submitBtn = findByTestAttr(wrapper, 'submit-btn');
  submitBtn.simulate('click', { preventDefault: () => {} });
  return wrapper;
};

// No words guessed in the table
describe.skip('no words guessed', () => {
  let wrapper = mount(<App />);

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [],
    });
  });

  test('should create GuessedWords table with one row', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsRows).toHaveLength(1);
  });
});

// Some words guessed in the table
describe.skip('some words guessed', () => {
  let wrapper = mount(<App />);

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
    });
  });

  test('should create GuessedWords table with one row', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsRows).toHaveLength(2);
  });
});

describe.skip('guess secret word', () => {
  let wrapper = mount(<App />);

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
    });

    const input = findByTestAttr(wrapper, 'input');
    input.simulate('change', { target: { value: 'party' } });

    const submitBtn = findByTestAttr(wrapper, 'submit-btn');
    submitBtn.simulate('click', { preventDefault: () => {} });
  });

  test('should add row to guessedWord table', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsRows).toHaveLength(3);
  });

  test('should show congrats message', () => {
    const congratsMessage = findByTestAttr(wrapper, 'congrats-message');
    expect(congratsMessage).toHaveLength(1);
  });

  test('should not show input component content', () => {
    const input = findByTestAttr(wrapper, 'input');
    expect(input).toHaveLength(0);

    const submitBtn = findByTestAttr(wrapper, 'input');
    expect(submitBtn).toHaveLength(0);
  });
});
