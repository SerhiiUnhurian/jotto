import TotalGuesses from "./TotalGuesses";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../../test/testUtils";

const setup = (props = {}) => {
  return shallow(<TotalGuesses {...props} />);
};

describe("<TotalGuesses />", () => {
  test("should render without error", () => {
    const wrapper = setup({ totalGuesses: 3 });
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.length).toBe(1);
  });

  test("should not render component", () => {
    const wrapper = setup({ totalGuesses: 0 });
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.length).toBe(0);
  });

  test("should not throw warning with expected props", () => {
    const expectedProps = { totalGuesses: 3 };
    checkProps(TotalGuesses, expectedProps);
  });
});
