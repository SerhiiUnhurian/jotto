import { shallow } from "enzyme";
import Congrats from "./Congrats";
import { findByTestAttr } from "../../test/testUtils";
import { checkProps } from "../../test/testUtils";

const defaultProps = { display: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

describe("<Congrats />", () => {
  test("should render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.length).toBe(1);
  });
  test("should not render congrats message", () => {
    const wrapper = setup({ display: false });
    const component = findByTestAttr(wrapper, "component-congrats");
    expect(component.text()).toBe("");
  });
  test("should render congrats message", () => {
    const wrapper = setup({ display: true });
    const message = findByTestAttr(wrapper, "congrats-message");
    expect(message.text().length).not.toBe(0);
  });
  test("should not throw warning with expected props", () => {
    checkProps(Congrats, defaultProps);
  });
});
