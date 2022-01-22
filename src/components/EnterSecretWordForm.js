import React, { useState } from "react";
import getStringByLanguage from "../helpers/strings";
import { useLanguageContext } from "../contexts/LanguageContext";
import { PropTypes } from "prop-types";

const EnterSecretWordForm = ({ onSubmit, onCancel }) => {
  const [currentSecretWord, setCurrentSecretWord] = useState("");
  const { language } = useLanguageContext();

  const handleSecretWordChange = ({ target }) => {
    setCurrentSecretWord(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(currentSecretWord.trim());
    setCurrentSecretWord("");
  };

  return (
    <div data-test="component-enter-secret-word-form">
      <p data-test="instructions">
        Enter a secret word for someone else to guess!
      </p>
      <form className="form-inline">
        <input
          onChange={handleSecretWordChange}
          value={currentSecretWord}
          className="mb-2 mr-3"
          data-test="input"
          type="text"
          placeholder="enter guess"
        />
        <button
          onClick={handleSubmit}
          data-test="submit-btn"
          className="btn btn-primary mb-2"
          disabled={currentSecretWord.trim().length <= 0}
        >
          {getStringByLanguage(language, "submit")}
        </button>
        <button
          onClick={onCancel}
          data-test="cancel-btn"
          className="btn btn-danger mb-2 ml-2"
        >
          {getStringByLanguage(language, "cancel")}
        </button>
      </form>
    </div>
  );
};

EnterSecretWordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EnterSecretWordForm;
