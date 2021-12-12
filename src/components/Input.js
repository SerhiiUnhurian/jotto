import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { giveUp, guessWord } from '../actions';

const Input = () => {
  const [currentGuess, setCurrentGuess] = useState('');
  const success = useSelector((state) => state.success);
  const gaveUp = useSelector((state) => state.gaveUp);
  const guessedWords = useSelector((state) => state.guessedWords);
  const dispatch = useDispatch();

  const handleGuessChange = ({ target }) => {
    setCurrentGuess(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(guessWord(currentGuess.trim()));
    setCurrentGuess('');
  };

  const handleGiveUp = (event) => {
    event.preventDefault();

    dispatch(giveUp());
  };

  if (success || gaveUp) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          onChange={handleGuessChange}
          value={currentGuess}
          className="mb-2 mr-3"
          data-test="input"
          type="text"
          placeholder="enter guess"
        />
        <button
          onClick={handleSubmit}
          data-test="submit-btn"
          className="btn btn-primary mb-2"
          disabled={currentGuess.trim().length <= 0}
        >
          Submit
        </button>
        {!!guessedWords.length && (
          <button
            onClick={handleGiveUp}
            data-test="giveup-btn"
            className="btn btn-danger mb-2 ml-2"
          >
            Give Up
          </button>
        )}
      </form>
    </div>
  );
};

export default Input;
