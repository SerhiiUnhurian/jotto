import { mount } from 'enzyme';
import App from './App';
import { findByTestAttr, storeFactory } from '../test/testUtils';
import { Provider } from 'react-redux';

/**
 * Activate global mock to mack sure getSecretWord doesn't make network call
 */
jest.mock('./actions');
import { getSecretWord as mockGetSecretWord } from './actions';

const setup = () => {
  const store = storeFactory();
  // useEffect does not run on shallow rendering
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test('renders without errors', () => {
  const wrapper = setup();
  const app = findByTestAttr(wrapper, 'component-app');
  expect(app.exists()).toBe(true);
});

describe('getSecretWord', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });

  test('should call getSecretWord on mount', () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test('should not call getSecretWord on update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
