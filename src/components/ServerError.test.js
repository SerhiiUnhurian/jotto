import ServerError from "./ServerError";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../../test/testUtils";

const mockOnClick = jest.fn();

const setup = () => {
  return shallow(<ServerError errMessage="error" onClick={mockOnClick} />);
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

  test("should call `onClick` prop", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "try-again-btn");
    button.simulate("click");
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("should not throw warning with expected props", () => {
    checkProps(ServerError, { errMessage: "error", onClick: () => {} });
  });
});
