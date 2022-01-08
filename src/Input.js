import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useLanguageContext } from "./contexts/LanguageContext";
import getStringByLanguage from "./helpers/strings";

const Input = ({ success, onSubmit }) => {
  const [guessWord, setGuessWord] = useState("");
  const { language } = useLanguageContext();

  const handleGuessChange = ({ target }) => {
    setGuessWord(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(guessWord);
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
          className="mb-2 mx-sm-3"
          data-test="input"
          type="text"
          placeholder={getStringByLanguage(language, "guessInputPlaceholder")}
        />
        <button
          onClick={handleSubmit}
          data-test="submit-btn"
          className="btn btn-primary mb-2"
        >
          {getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Input;
