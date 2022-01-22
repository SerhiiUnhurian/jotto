import { mount } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import App from "../App";
import * as actions from "../actions/index";

actions.getSecretWord = jest.fn((setSecretWord) => setSecretWord("party"));

const setup = () => {
  return mount(<App />);
};

describe("enter secret word", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test("should render <EnterSecretWordButton />", () => {
    const btn = findByTestAttr(wrapper, "component-enter-secret-word-btn");
    expect(btn).toHaveLength(1);
  });

  test("should not render <EnterSecretWordButton />", () => {
    const input = findByTestAttr(wrapper, "input");
    input.simulate("change", { target: { value: "train" } });

    const submitBtn = findByTestAttr(wrapper, "submit-btn");
    submitBtn.simulate("click", { preventDefault: () => {} });

    const enterSecretWordBtn = findByTestAttr(
      wrapper,
      "component-enter-secret-word-btn"
    );
    expect(enterSecretWordBtn).toHaveLength(0);
  });

  describe("click `Enter your own secret word` button", () => {
    beforeEach(() => {
      const enterSecretWordBtn = findByTestAttr(
        wrapper,
        "component-enter-secret-word-btn"
      );
      enterSecretWordBtn.simulate("click");
    });

    test("should render <EnterSecretWordForm />", () => {
      const form = findByTestAttr(wrapper, "component-enter-secret-word-form");
      expect(form).toHaveLength(1);
    });

    test("should not render anything else", () => {
      expect(wrapper.children).toHaveLength(1);
    });

    test("should not render <EnterSecretWordForm /> after click `Cancel` button", () => {
      const cancelBtn = findByTestAttr(wrapper, "cancel-btn");
      cancelBtn.simulate("click");

      const form = findByTestAttr(wrapper, "component-enter-secret-word-form");
      expect(form).toHaveLength(0);
    });
  });
});
