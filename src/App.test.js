import { shallow } from 'enzyme';
import App from './App';
import { findByTestAttr } from '../test/testUtils';

const setup = () => shallow(<App />);

test('renders without errors', () => {
  const wrapper = setup();
  const app = findByTestAttr(wrapper, 'component-app');
  expect(app.exists()).toBe(true);
});
