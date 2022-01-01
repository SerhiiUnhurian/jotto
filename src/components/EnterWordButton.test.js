import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../../test/testUtils";
import EnterWordButton from "./EnterWordButton";

const defaultProps = { display: true, onClick: () => {} };

const setup = (props = {}) => {
  return shallow(<EnterWordButton {...defaultProps} {...props} />);
};

describe("<EnterWordButton />", () => {
  test("should render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-enter-word-btn");
    expect(component.length).toBe(1);
  });

  test("should not render", () => {
    const wrapper = setup({ display: false });
    const component = findByTestAttr(wrapper, "component-enter-word-btn");
    expect(component.length).toBe(0);
  });

  test("should call `onClick` upon button click", () => {
    const mockOnClick = jest.fn();
    const wrapper = setup({ onClick: mockOnClick });
    wrapper.simulate("click", { target: { preventDefault: () => {} } });
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("should not throw warning with expected props", () => {
    checkProps(EnterWordButton, defaultProps);
  });
});
