import { shallow } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import { checkProps } from "../../test/testUtils";
import GuessedWords from "./GuessedWords";

const setup = (props = {}) => shallow(<GuessedWords {...props} />);

describe("<GuessedWords />", () => {
  test("should not throw warning with expected props", () => {
    const expectedProps = {
      guessedWords: [{ guessedWord: "lucky", letterMatchCount: 0 }],
    };
    checkProps(GuessedWords, expectedProps);
  });

  describe("there is no words guessed", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({ guessedWords: [] });
    });

    test("should render without error", () => {
      const component = findByTestAttr(wrapper, "component-guessed-words");
      expect(component.length).toBe(1);
    });

    test("should render instructions without error", () => {
      const component = findByTestAttr(wrapper, "instructions-message");
      expect(component.text().length).not.toBe(0);
    });
  });

  describe("there are words guessed", () => {
    let wrapper;
    const guessedWords = [
      { guessedWord: "study", letterMatchCount: 3 },
      { guessedWord: "work", letterMatchCount: 2 },
      { guessedWord: "party", letterMatchCount: 1 },
    ];

    beforeEach(() => {
      wrapper = setup({ guessedWords });
    });

    test("should render without error", () => {
      const component = findByTestAttr(wrapper, "component-guessed-words");
      expect(component.length).toBe(1);
    });

    test("should render guessed words without error", () => {
      const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordNodes.length).toBe(guessedWords.length);
    });
  });
});
