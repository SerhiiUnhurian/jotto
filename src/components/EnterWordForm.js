import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSecretWord, setEnterSecretWord } from '../actions/index';

const EnterWordForm = () => {
  const [currentSecretWord, setCurrentSecretWord] = useState('');
  const dispatch = useDispatch();

  const handleSecretWordChange = ({ target }) => {
    setCurrentSecretWord(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(setSecretWord(currentSecretWord.trim()));
    setCurrentSecretWord('');
  };

  const handleCancel = () => {
    dispatch(setEnterSecretWord(false));
  };

  return (
    <div data-test="component-enter-word-form">
      <p data-test="instructions">Enter a secret word for someone else to guess!</p>
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
          Submit
        </button>
        <button
          onClick={handleCancel}
          data-test="cancel-btn"
          className="btn btn-danger mb-2 ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EnterWordForm;
