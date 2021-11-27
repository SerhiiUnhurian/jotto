import PropTypes from 'prop-types';

const GuessedWords = ({ guessedWords }) => {
  const guessedWordsRows = guessedWords.map((guess, idx) => (
    <tr key={idx} data-test="guessed-word">
      <td>{guess.guessedWord}</td>
      <td>{guess.letterMatchCount}</td>
    </tr>
  ));

  return (
    <div data-test="component-guessed-words">
      {guessedWords.length === 0 ? (
        <span data-test="instructions-message">
          Try to guess the secret word!
        </span>
      ) : (
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>Guess</th>
              <th>Letters match</th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      )}
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ),
};

GuessedWords.defaultProps = {
  guessedWords: [],
};

export default GuessedWords;
