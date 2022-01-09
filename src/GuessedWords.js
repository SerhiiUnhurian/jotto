import PropTypes from "prop-types";
import { useGuessedWordsContext } from "./contexts/GuessedWordsContext";
import { useLanguageContext } from "./contexts/LanguageContext";
import getStringByLanguage from "./helpers/strings";

const GuessedWords = () => {
  const { language } = useLanguageContext();
  const [guessedWords] = useGuessedWordsContext();

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
          {getStringByLanguage(language, "guessPrompt")}
        </span>
      ) : (
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>{getStringByLanguage(language, "guessColumnHeader")}</th>
              <th>
                {getStringByLanguage(language, "matchingLettersColumnHeader")}
              </th>
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

export default GuessedWords;
