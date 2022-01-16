import { mount } from "enzyme";
import { checkProps, findByTestAttr } from "../../test/testUtils";
import LanguageContext from "../contexts/LanguageContext";
import getStringByLanguage from "../helpers/strings";
import { SuccessProvider } from "../contexts/SuccessContext";
import NewWordButton from "./NewWordButton";
import { GuessedWordsProvider } from "../contexts/GuessedWordsContext";

const mockOnClick = jest.fn();
const mockSetSuccess = jest.fn();
const mockSetGuessedWords = jest.fn();

const setup = ({ language = "en", success = true } = {}) => {
  return mount(
    <LanguageContext.Provider value={{ language }}>
      <SuccessProvider value={[success, mockSetSuccess]}>
        <GuessedWordsProvider value={[[], mockSetGuessedWords]}>
          <NewWordButton onClick={mockOnClick} />
        </GuessedWordsProvider>
      </SuccessProvider>
    </LanguageContext.Provider>
  );
};

describe("<NewWordButton />", () => {
  test("should render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-new-word-btn");
    expect(component).toHaveLength(1);
  });

  test("should not render component", () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, "component-new-word-btn");
    expect(component).toHaveLength(0);
  });

  test("should not throw warning with expected props", () => {
    const expectedProps = { onClick: () => {} };
    checkProps(NewWordButton, expectedProps);
  });

  describe("button click", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
      const button = findByTestAttr(wrapper, "component-new-word-btn");
      button.simulate("click");
    });

    test("should call `onClick` prop", () => {
      expect(mockOnClick).toHaveBeenCalled();
    });

    test("should reset `success` state", () => {
      expect(mockSetSuccess).toHaveBeenCalledWith(false);
    });

    test("should reset `guessedWords` state", () => {
      expect(mockSetGuessedWords).toHaveBeenCalledWith([]);
    });
  });

  describe("languageContext", () => {
    it("should render button text in english", () => {
      const wrapper = setup({ language: "en" });
      expect(wrapper.text()).toBe(getStringByLanguage("en", "newWord"));
    });
    it("should render button text with emoji", () => {
      const wrapper = setup({ language: "emoji" });
      expect(wrapper.text()).toBe(getStringByLanguage("emoji", "newWord"));
    });
  });
});
