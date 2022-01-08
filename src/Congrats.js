import PropTypes from "prop-types";
import getStringByLanguage from "./helpers/strings";
import { useLanguageContext } from "./contexts/LanguageContext";

const Congrats = ({ success }) => {
  const { language } = useLanguageContext();

  return success ? (
    <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">
        {getStringByLanguage(language, "congrats")}
      </span>
    </div>
  ) : (
    <div data-test="component-congrats" />
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
