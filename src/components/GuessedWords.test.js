import { shallow } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import GuessedWords from "./GuessedWords";
import getStringByLanguage from "../helpers/strings";
import * as LanguageContext from "../contexts/LanguageContext";
import * as GuessedWordsContext from "../contexts/GuessedWordsContext";

const setup = (guessedWords = []) => {
  GuessedWordsContext.useGuessedWordsContext = jest
    .fn()
    .mockReturnValue([guessedWords, () => {}]);

  return shallow(<GuessedWords />);
};

describe("<GuessedWords />", () => {
  describe("there is no words guessed", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    test("should render without error", () => {
      const component = findByTestAttr(wrapper, "component-guessed-words");
      expect(component.length).toBe(1);
    });

    test("should render instructions", () => {
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
      wrapper = setup(guessedWords);
    });

    test("should render without error", () => {
      const component = findByTestAttr(wrapper, "component-guessed-words");
      expect(component.length).toBe(1);
    });

    test("should not render instructions", () => {
      const component = findByTestAttr(wrapper, "instructions-message");
      expect(component).toHaveLength(0);
    });

    test("should render guessed words", () => {
      const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordNodes.length).toBe(guessedWords.length);
      guessedWordNodes.forEach((node, i) => {
        const text = node.text();
        const { guessedWord, letterMatchCount } = guessedWords[i];
        const wordCount = i + 1;

        expect(text).toContain(guessedWord);
        expect(text).toContain(letterMatchCount);
        expect(text).toContain(wordCount);
      });
    });

    test("should render total number of guesses", () => {
      const guessedWordNodes = findByTestAttr(wrapper, "total-guesses");
      expect(guessedWordNodes.text()).toContain(guessedWords.length);
    });
  });

  describe("languageContext", () => {
    it("should render instructions text in default language", () => {
      const wrapper = setup();
      const instructions = findByTestAttr(wrapper, "instructions-message");
      expect(instructions.text()).toBe(
        getStringByLanguage("en", "guessPrompt")
      );
    });

    it("should render instructions text with emoji", () => {
      jest
        .spyOn(LanguageContext, "useLanguageContext")
        .mockReturnValue({ language: "emoji" });
      const wrapper = setup();
      const instructions = findByTestAttr(wrapper, "instructions-message");
      expect(instructions.text()).toBe(
        getStringByLanguage("emoji", "guessPrompt")
      );
    });
  });
});

/**
 * Test GuessedWords component implemented with props
 */

// import { shallow } from "enzyme";
// import { findByTestAttr } from "../test/testUtils";
// import { checkProps } from "../test/testUtils";
// import GuessedWords from "./GuessedWords";
// import getStringByLanguage from "./helpers/strings";
// import * as LanguageContext from "./contexts/LanguageContext";

// const setup = (props = {}) => shallow(<GuessedWords {...props} />);

// describe("<GuessedWords />", () => {
//   test("should not throw warning with expected props", () => {
//     const expectedProps = {
//       guessedWords: [{ guessedWord: "lucky", letterMatchCount: 0 }],
//     };
//     checkProps(GuessedWords, expectedProps);
//   });

//   describe("there is no words guessed", () => {
//     let wrapper;

//     beforeEach(() => {
//       wrapper = setup({ guessedWords: [] });
//     });

//     test("should render without error", () => {
//       const component = findByTestAttr(wrapper, "component-guessed-words");
//       expect(component.length).toBe(1);
//     });

//     test("should render instructions without error", () => {
//       const component = findByTestAttr(wrapper, "instructions-message");
//       expect(component.text().length).not.toBe(0);
//     });
//   });

//   describe("there are words guessed", () => {
//     let wrapper;
//     const guessedWords = [
//       { guessedWord: "study", letterMatchCount: 3 },
//       { guessedWord: "work", letterMatchCount: 2 },
//       { guessedWord: "party", letterMatchCount: 1 },
//     ];

//     beforeEach(() => {
//       wrapper = setup({ guessedWords });
//     });

//     test("should render without error", () => {
//       const component = findByTestAttr(wrapper, "component-guessed-words");
//       expect(component.length).toBe(1);
//     });

//     test("should render guessed words without error", () => {
//       const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
//       expect(guessedWordNodes.length).toBe(guessedWords.length);
//     });
//   });

//   describe("languageContext", () => {
//     it("should render instructions text in default language", () => {
//       const wrapper = setup();
//       const instructions = findByTestAttr(wrapper, "instructions-message");
//       expect(instructions.text()).toBe(
//         getStringByLanguage("en", "guessPrompt")
//       );
//     });

//     it("should render instructions text with emoji", () => {
//       jest
//         .spyOn(LanguageContext, "useLanguageContext")
//         .mockReturnValue({ language: "emoji" });
//       const wrapper = setup();
//       const instructions = findByTestAttr(wrapper, "instructions-message");
//       expect(instructions.text()).toBe(
//         getStringByLanguage("emoji", "guessPrompt")
//       );
//     });
//   });
// });
