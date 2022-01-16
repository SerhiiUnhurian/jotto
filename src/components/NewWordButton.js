import { PropTypes } from "prop-types";
import { useGuessedWordsContext } from "../contexts/GuessedWordsContext";
import { useSuccessContext } from "../contexts/SuccessContext";
import getStringByLanguage from "../helpers/strings";
import { useLanguageContext } from "../contexts/LanguageContext";

const NewWordButton = ({ onClick }) => {
  const { language } = useLanguageContext();
  const [success, setSuccess] = useSuccessContext();
  const [, setGuessedWords] = useGuessedWordsContext();

  const handleClick = () => {
    setSuccess(false);
    setGuessedWords([]);
    onClick();
  };

  return success ? (
    <button
      className="btn btn-primary mb-2"
      data-test="component-new-word-btn"
      onClick={handleClick}
    >
      {getStringByLanguage(language, "newWord")}
    </button>
  ) : null;
};

NewWordButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewWordButton;
