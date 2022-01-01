import NewWordButton from "./NewWordButton";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../../test/testUtils";

const defaultProps = { display: false, onClick: () => {} };

const setup = (props = {}) => {
  return shallow(<NewWordButton {...defaultProps} {...props} />);
};

describe("<NewWordButton />", () => {
  test("should render without error", () => {
    const wrapper = setup({ display: true });
    const component = findByTestAttr(wrapper, "component-new-word-btn");
    expect(component.length).toBe(1);
  });

  test("should not render component", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-new-word-btn");
    expect(component.length).toBe(0);
  });

  test("should not throw warning with expected props", () => {
    const expectedProps = { display: true, onClick: () => {} };
    checkProps(NewWordButton, expectedProps);
  });

  test("should call `onClick` upon button click", () => {
    const mockOnClick = jest.fn();
    const wrapper = setup({ display: true, onClick: mockOnClick });
    wrapper.simulate("click", { preventDefault: () => {} });

    expect(mockOnClick).toHaveBeenCalled();
  });
});
