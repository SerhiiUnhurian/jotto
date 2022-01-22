import { mount } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import { SuccessProvider } from "../contexts/SuccessContext";
import { GuessedWordsProvider } from "../contexts/GuessedWordsContext";
import Congrats from "../components/Congrats";
import GuessedWords from "../components/GuessedWords";
import Input from "../components/Input";
import NewWordButton from "../components/NewWordButton";

/**
 * Functional tests for App components
 */

const setup = ({ secretWord, guessedWords }) => {
  const wrapper = mount(
    <SuccessProvider>
      <GuessedWordsProvider>
        <Congrats />
        <NewWordButton onClick={() => {}} />
        <Input secretWord={secretWord} onGiveUp={() => {}} />
        <GuessedWords />
      </GuessedWordsProvider>
    </SuccessProvider>
  );

  const input = findByTestAttr(wrapper, "input");
  input.simulate("change", { target: { value: "train" } });

  const submitBtn = findByTestAttr(wrapper, "submit-btn");
  submitBtn.simulate("click", { preventDefault: () => {} });

  guessedWords.forEach((guess) => {
    input.simulate("change", { target: { value: guess.guessedWord } });
    submitBtn.simulate("click", { preventDefault: () => {} });
  });

  return wrapper;
};

describe("guess a word", () => {
  describe("no words guessed", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({
        secretWord: "party",
        guessedWords: [],
      });
    });

    test("should create GuessedWords table with one row", () => {
      const guessedWordsRows = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordsRows).toHaveLength(1);
    });
  });

  describe("some words guessed", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({
        secretWord: "party",
        guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
      });
    });

    test("should create GuessedWords table with one row", () => {
      const guessedWordsRows = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordsRows).toHaveLength(2);
    });
  });

  describe("guess secret word", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup({
        secretWord: "party",
        guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
      });

      const input = findByTestAttr(wrapper, "input");
      input.simulate("change", { target: { value: "party" } });

      const submitBtn = findByTestAttr(wrapper, "submit-btn");
      submitBtn.simulate("click", { preventDefault: () => {} });
    });

    test("should add row to guessedWord table", () => {
      const guessedWordsRows = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordsRows).toHaveLength(3);
    });

    test("should render <Congrats />", () => {
      const congrats = findByTestAttr(wrapper, "component-congrats");
      expect(congrats).toHaveLength(1);
    });

    test("should render <NewWordButton />", () => {
      const newWordBtn = findByTestAttr(wrapper, "component-new-word-btn");
      expect(newWordBtn).toHaveLength(1);
    });

    test("should not render <Input />", () => {
      const input = findByTestAttr(wrapper, "component-input");
      expect(input).toHaveLength(0);
    });
  });
});
