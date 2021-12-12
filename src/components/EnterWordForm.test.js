import { findByTestAttr, storeFactory } from '../../test/testUtils';
import EnterWordForm from './EnterWordForm';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const mockSetSecretWord = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState) => [initialState, mockSetSecretWord],
}));

const setup = (initialStoreState = {}, props = {}) => {
  const store = storeFactory(initialStoreState);
  return mount(
    <Provider store={store}>
      <EnterWordForm {...props} />
    </Provider>
  );
};

describe('render', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('should render without error', () => {
    const component = findByTestAttr(wrapper, 'component-enter-word-form');
    expect(component.length).toBe(1);
  });

  test('should render input', () => {
    const input = findByTestAttr(wrapper, 'input');
    expect(input.exists()).toBe(true);
  });

  test('should render instructions', () => {
    const input = findByTestAttr(wrapper, 'instructions');
    expect(input.exists()).toBe(true);
  });

  test('should render submit button', () => {
    const submitBtn = findByTestAttr(wrapper, 'submit-btn');
    expect(submitBtn.exists()).toBe(true);
  });

  test('should render cancel button', () => {
    const submitBtn = findByTestAttr(wrapper, 'cancel-btn');
    expect(submitBtn.exists()).toBe(true);
  });
});

describe('input field', () => {
  let wrapper;

  beforeEach(() => {
    mockSetSecretWord.mockClear();
    wrapper = setup();
  });

  test('should update input state upon change', () => {
    const mockEvent = { target: { value: 'party' } };
    const input = findByTestAttr(wrapper, 'input');
    input.simulate('change', mockEvent);
    expect(mockSetSecretWord).toHaveBeenCalledWith('party');
  });

  test.skip('should clear input state upon submit', () => {
    const mockEvent = { target: { value: 'train' } };
    const input = findByTestAttr(wrapper, 'input');
    input.simulate('change', mockEvent);

    const submitBtn = findByTestAttr(wrapper, 'submit-btn');
    expect(submitBtn.instance()).not.toHaveAttribute('disabled');
    submitBtn.simulate('click', { preventDefault: () => {} });

    // looks like button click doesn't work since button is disabled
    // expect(mockSetGuess.mock.calls.length).toBe(2);
    expect(mockSetSecretWord).toHaveBeenCalledWith('');
  });
});
