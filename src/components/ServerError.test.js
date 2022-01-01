import ServerError from "./ServerError";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../../test/testUtils";

const defaultProps = { errMessage: "error", onClick: () => {} };

const setup = (props = {}) => {
  return shallow(<ServerError {...defaultProps} {...props} />);
};

describe("<ServerError />", () => {
  test("should render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-server-error");
    expect(component.length).toBe(1);
  });

  test("should render error message", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-server-error");
    expect(component.text()).toContain("error");
  });

  test("should render `Try again` button", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "try-again-btn");
    expect(component).toHaveLength(1);
  });

  test("should call `onClick` upon button click", () => {
    const mockOnClick = jest.fn();
    const wrapper = setup({ onClick: mockOnClick });
    const button = findByTestAttr(wrapper, "try-again-btn");
    button.simulate("click");
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("should not throw warning with expected props", () => {
    checkProps(ServerError, defaultProps);
  });
});
