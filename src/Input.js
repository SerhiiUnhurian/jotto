import { PropTypes } from 'prop-types';
import React, { useState } from 'react';

const Input = ({ success, secretWord }) => {
  const [guess, setGuess] = useState('');

  const handleGuessChange = ({ target }) => {
    setGuess(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO: Update guessedWords global state
    //TODO: check against secretWord and optionally update success global state
    setGuess('');
  };

  if (success) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          onChange={handleGuessChange}
          value={guess}
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
// const Input = ({ onSubmit }) => {
//   const [guess, setGuess] = useState('');

//   const handleGuessChange = ({ target }) => {
//     setGuess(target.value);
//   };

//   const handleSubmit = () => {
//     onSubmit(guess);
//     setGuess('');
//   };

//   return (
//     <div data-test="component-input">
//       <input onChange={handleGuessChange} value={guess}></input>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

Input.defaultProps = {
  secretWord: '',
};

export default Input;
