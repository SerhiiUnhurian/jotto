import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Input = ({ secretWord }) => {
  const [guessWord, setGuessWord] = useState('');
  const success = useSelector((state) => state.success);

  const handleGuessChange = ({ target }) => {
    setGuessWord(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO: Update guessedWords global state
    //TODO: check against secretWord and optionally update success global state
    setGuessWord('');
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
          placeholder="enter guess"
        />
        <button
          onClick={handleSubmit}
          data-test="submit-btn"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

Input.defaultProps = {
  secretWord: '',
};

export default Input;
