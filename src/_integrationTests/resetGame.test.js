import { mount } from "enzyme";
import App from "../App";
import { findByTestAttr } from "../../test/testUtils";

jest.mock("../actions");

const setup = () => {
  const wrapper = mount(<App />);

  const input = findByTestAttr(wrapper, "input");
  input.simulate("change", { target: { value: "party" } });

  const submitBtn = findByTestAttr(wrapper, "submit-btn");
  submitBtn.simulate("click", { preventDefault: () => {} });

  const newWordButton = findByTestAttr(wrapper, "component-new-word-btn");
  newWordButton.simulate("click");

  return wrapper;
};

describe("reset the game", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it("should not render <NewWordButton />", () => {
    const input = findByTestAttr(wrapper, "component-new-word-btn");
    expect(input).toHaveLength(0);
  });

  it("should not render <Congrats />", () => {
    const input = findByTestAttr(wrapper, "component-congrats");
    expect(input).toHaveLength(0);
  });

  it("should render <Input />", () => {
    const input = findByTestAttr(wrapper, "component-input");
    expect(input).toHaveLength(1);
  });
});
