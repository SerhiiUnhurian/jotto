import { PropTypes } from "prop-types";
import { useLanguageContext } from "../contexts/LanguageContext";
import getStringByLanguage from "../helpers/strings";
import { useGuessedWordsContext } from "../contexts/GuessedWordsContext";

const EnterSecretWordButton = ({ onClick }) => {
  const { language } = useLanguageContext();
  const [guessedWords] = useGuessedWordsContext();

  return (
    guessedWords.length === 0 && (
      <button
        onClick={onClick}
        data-test="component-enter-secret-word-btn"
        className="btn btn-primary mt-5"
      >
        {getStringByLanguage(language, "enterSecretWord")}
      </button>
    )
  );
};

EnterSecretWordButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EnterSecretWordButton;
