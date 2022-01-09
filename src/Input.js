import React, { useState } from "react";
import { useGuessedWordsContext } from "./contexts/GuessedWordsContext";
import { useLanguageContext } from "./contexts/LanguageContext";
import { useSuccessContext } from "./contexts/SuccessContext";
import getStringByLanguage from "./helpers/strings";
import { getLetterMatchCount } from "./helpers/index";
import { PropTypes } from "prop-types";

const Input = ({ secretWord }) => {
  const [guessWord, setGuessWord] = useState("");
  const { language } = useLanguageContext();
  const [success, setSuccess] = useSuccessContext();
  const [guessedWords, setGuessedWords] = useGuessedWordsContext();

  const handleGuessChange = ({ target }) => {
    setGuessWord(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const guess = guessWord.trim();

    if (!guess) return;
    if (guess === secretWord) {
      setSuccess(true);
    }
    setGuessedWords([
      ...guessedWords,
      {
        guessedWord: guess,
        letterMatchCount: getLetterMatchCount(guess, secretWord),
      },
    ]);
    setGuessWord("");
  };

  if (success) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          onChange={handleGuessChange}
          value={guessWord}
          className="mb-2 mr-3"
          data-test="input"
          type="text"
          placeholder={getStringByLanguage(language, "guessInputPlaceholder")}
        />
        <button
          onClick={handleSubmit}
          data-test="submit-btn"
          className="btn btn-primary mb-2"
          disabled={!guessWord.trim()}
        >
          {getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
