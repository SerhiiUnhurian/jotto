import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useGuessedWordsContext } from "../contexts/GuessedWordsContext";
import { useLanguageContext } from "../contexts/LanguageContext";
import { useSuccessContext } from "../contexts/SuccessContext";
import { getLetterMatchCount } from "../helpers/index";
import getStringByLanguage from "../helpers/strings";

const Input = ({ secretWord, onGiveUp }) => {
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

  const handleGiveUp = (event) => {
    event.preventDefault();

    setSuccess(true);
    onGiveUp(true);
  };

  if (success) {
    return null;
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
        {!!guessedWords.length && (
          <button
            onClick={handleGiveUp}
            data-test="giveup-btn"
            className="btn btn-danger mb-2 ml-2"
          >
            {getStringByLanguage(language, "giveUp")}
          </button>
        )}
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
  onGiveUp: PropTypes.func.isRequired,
};

export default Input;
