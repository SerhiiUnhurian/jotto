import { mount } from "enzyme";
import Input from "./Input";
import { findByTestAttr, checkProps } from "../../test/testUtils";
import getStringByLanguage from "../helpers/strings";
import { SuccessProvider } from "../contexts/SuccessContext";
import LanguageContext from "../contexts/LanguageContext";
import { GuessedWordsProvider } from "../contexts/GuessedWordsContext";

const setup = ({
  success = false,
  language = "en",
  guessedWords = [],
} = {}) => {
  return mount(
    <LanguageContext.Provider value={{ language }}>
      <SuccessProvider value={[success, jest.fn()]}>
        <GuessedWordsProvider value={[guessedWords, jest.fn()]}>
          <Input secretWord="party" onGiveUp={jest.fn()} />
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
    checkProps(Input, { secretWord: "party", onGiveUp: () => {} });
  });

  describe("input field", () => {
    let wrapper;

    beforeEach(() => {
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
    test("should not render component", () => {
      const wrapper = setup({ success: true });
      const input = findByTestAttr(wrapper, "component-input");
      expect(input).toHaveLength(0);
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

    test("should not render give up button", () => {
      const wrapper = setup({ success: false });
      const button = findByTestAttr(wrapper, "giveup-btn");
      expect(button).toHaveLength(0);
    });

    test("should render give up button", () => {
      const wrapper = setup({
        success: false,
        guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
      });
      const button = findByTestAttr(wrapper, "giveup-btn");
      expect(button).toHaveLength(1);
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
