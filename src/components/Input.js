import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { guessWord } from '../actions';

const Input = () => {
  const [currentGuess, setCurrentGuess] = useState('');
  const success = useSelector((state) => state.success);
  const dispatch = useDispatch();

  const handleGuessChange = ({ target }) => {
    setCurrentGuess(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(guessWord(currentGuess));
    setCurrentGuess('');
  };

  if (success) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          onChange={handleGuessChange}
          value={currentGuess}
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

export default Input;
