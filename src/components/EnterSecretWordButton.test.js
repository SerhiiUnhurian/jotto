import GiveUpMessage from "./GiveUpMessage";
import { checkProps, findByTestAttr } from "../../test/testUtils";
import EnterSecretWordButton from "./EnterSecretWordButton";
import { mount } from "enzyme";
import { GuessedWordsProvider } from "../contexts/GuessedWordsContext";
import LanguageContext from "../contexts/LanguageContext";
import getStringByLanguage from "../helpers/strings";

const mockOnClick = jest.fn();

const setup = ({ language = "en", guessedWords = [] } = {}) => {
  return mount(
    <LanguageContext.Provider value={{ language }}>
      <GuessedWordsProvider value={[guessedWords, () => {}]}>
        <EnterSecretWordButton onClick={mockOnClick} />
      </GuessedWordsProvider>
    </LanguageContext.Provider>
  );
};

describe("<EnterSecretWordButton />", () => {
  test("should render without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(
      wrapper,
      "component-enter-secret-word-btn"
    );
    expect(component.length).toBe(1);
  });

  test("should not render", () => {
    const wrapper = setup({
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
    const component = findByTestAttr(
      wrapper,
      "component-enter-secret-word-btn"
    );
    expect(component.length).toBe(0);
  });

  test("should call `onClick` prop", () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper, "component-enter-secret-word-btn");
    btn.simulate("click");
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("should not throw warning with expected props", () => {
    checkProps(GiveUpMessage, { onClick: () => {} });
  });

  describe("languageContext", () => {
    it("should render button text in english", () => {
      const wrapper = setup({ language: "en" });
      expect(wrapper.text()).toBe(getStringByLanguage("en", "enterSecretWord"));
    });
    it("should render button text with emoji", () => {
      const wrapper = setup({ language: "emoji" });
      expect(wrapper.text()).toBe(
        getStringByLanguage("emoji", "enterSecretWord")
      );
    });
  });
});
