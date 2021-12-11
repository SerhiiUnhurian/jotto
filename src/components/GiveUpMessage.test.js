import GiveUpMessage from './GiveUpMessage';
import { shallow } from 'enzyme';
import { checkProps, findByTestAttr } from '../../test/testUtils';

const secretWord = 'party';
const defaultProps = { gaveUp: false, secretWord };

const setup = (props = {}) => {
  return shallow(<GiveUpMessage {...defaultProps} {...props} />);
};

test('should render without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-giveup-message');
  expect(component.length).toBe(1);
});

test('should not render give up message', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'giveup-message');
  expect(component.length).toBe(0);
});

test('should render give up message with secret word', () => {
  const wrapper = setup({ gaveUp: true });
  const component = findByTestAttr(wrapper, 'giveup-message');
  expect(component.text()).toContain(secretWord);
});

test('should not throw warning with expected props', () => {
  checkProps(GiveUpMessage, defaultProps);
});
