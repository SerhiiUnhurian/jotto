import { mount } from 'enzyme';
import Input from './Input';
import { findByTestAttr, storeFactory } from '../test/testUtils';
import { checkProps } from '../test/testUtils';
import React from 'react';
import { Provider } from 'react-redux';

const mockSetGuess = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState) => [initialState, mockSetGuess],
}));

const setup = (initialStoreState = {}, props = {}) => {
  const store = storeFactory(initialStoreState);
  return mount(
    <Provider store={store}>
      <Input {...props} />
    </Provider>
  );
};

test('should render without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

test('should not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
});

describe('input field', () => {
  let wrapper;

  beforeEach(() => {
    mockSetGuess.mockClear();
    wrapper = setup();
  });

  test('should update input state upon change', () => {
    const mockEvent = { target: { value: 'party' } };
    const input = findByTestAttr(wrapper, 'input');
    input.simulate('change', mockEvent);
    expect(mockSetGuess).toHaveBeenCalledWith('party');
  });

  test('should clear input state upon submit', () => {
    const submitBtn = findByTestAttr(wrapper, 'submit-btn');
    submitBtn.simulate('click', { preventDefault: () => {} });
    expect(mockSetGuess).toHaveBeenCalledWith('');
  });
});

describe('success state is true', () => {
  test('should not render input', () => {
    const wrapper = setup({ success: true });
    const input = findByTestAttr(wrapper, 'input');
    expect(input.exists()).toBe(false);
  });

  test('should not render submit button', () => {
    const wrapper = setup({ success: true });
    const submitBtn = findByTestAttr(wrapper, 'submit-btn');
    expect(submitBtn.exists()).toBe(false);
  });
});

describe('success state is false', () => {
  test('should render input', () => {
    const wrapper = setup({ success: false });
    const input = findByTestAttr(wrapper, 'input');
    expect(input.exists()).toBe(true);
  });

  test('should render submit button', () => {
    const wrapper = setup({ success: false });
    const submitBtn = findByTestAttr(wrapper, 'submit-btn');
    expect(submitBtn.exists()).toBe(true);
  });
});
