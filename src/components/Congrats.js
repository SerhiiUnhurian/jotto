import getStringByLanguage from "../helpers/strings";
import { useLanguageContext } from "../contexts/LanguageContext";
import { useSuccessContext } from "../contexts/SuccessContext";

const Congrats = () => {
  const { language } = useLanguageContext();
  const [success] = useSuccessContext();

  return success ? (
    <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">
        {getStringByLanguage(language, "congrats")}
      </span>
    </div>
  ) : null;
};

export default Congrats;
