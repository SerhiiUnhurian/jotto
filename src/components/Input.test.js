import { mount } from "enzyme";
import Input from "./Input";
import { findByTestAttr, checkProps } from "../../test/testUtils";
import getStringByLanguage from "../helpers/strings";
import { SuccessProvider } from "../contexts/SuccessContext";
import LanguageContext from "../contexts/LanguageContext";
import { GuessedWordsProvider } from "../contexts/GuessedWordsContext";

const mockSetGuess = jest.fn();

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetGuess],
// }));

const setup = ({ success = false, language = "en" } = {}) => {
  return mount(
    <LanguageContext.Provider value={{ language }}>
      <SuccessProvider value={[success, jest.fn()]}>
        <GuessedWordsProvider>
          <Input secretWord="party" />
        </GuessedWordsProvider>
      </SuccessProvider>
    </LanguageContext.Provider>
  );
};

describe("<Input />", () => {
  test("should render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-input");
    expect(component.length).toBe(1);
  });

  test("should not throw warning with expected props", () => {
    checkProps(Input, { secretWord: "party" });
  });

  describe("input field", () => {
    let wrapper;

    beforeEach(() => {
      mockSetGuess.mockClear();
      wrapper = setup();
    });

    test("should update input state upon change", () => {
      findByTestAttr(wrapper, "input").simulate("change", {
        target: { value: "party" },
      });
      expect(findByTestAttr(wrapper, "input").at(0).prop("value")).toEqual(
        "party"
      );
    });

    test("should clear input state upon submit", () => {
      findByTestAttr(wrapper, "input").simulate("change", {
        target: { value: "party" },
      });
      const submitBtn = findByTestAttr(wrapper, "submit-btn");
      submitBtn.simulate("click", { preventDefault: () => {} });
      expect(findByTestAttr(wrapper, "input").at(0).prop("value")).toEqual("");
    });
  });

  describe("success is true", () => {
    test("should not render input", () => {
      const wrapper = setup({ success: true });
      const input = findByTestAttr(wrapper, "input");
      expect(input.exists()).toBe(false);
    });

    test("should not render submit button", () => {
      const wrapper = setup({ success: true });
      const submitBtn = findByTestAttr(wrapper, "submit-btn");
      expect(submitBtn.exists()).toBe(false);
    });
  });

  describe("success is false", () => {
    test("should render input", () => {
      const wrapper = setup({ success: false });
      const input = findByTestAttr(wrapper, "input");
      expect(input.exists()).toBe(true);
    });

    test("should render submit button", () => {
      const wrapper = setup({ success: false });
      const submitBtn = findByTestAttr(wrapper, "submit-btn");
      expect(submitBtn.exists()).toBe(true);
    });
  });

  describe("languageContext", () => {
    it("should render button text in english", () => {
      const wrapper = setup({ language: "en" });
      const button = findByTestAttr(wrapper, "submit-btn");
      expect(button.text()).toBe(getStringByLanguage("en", "submit"));
    });

    it("should render button text with emoji", () => {
      const wrapper = setup({ language: "emoji" });
      const button = findByTestAttr(wrapper, "submit-btn");
      expect(button.text()).toBe(getStringByLanguage("emoji", "submit"));
    });
  });
});
