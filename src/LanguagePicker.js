import { PropTypes } from "prop-types";
import { languageStrings } from "./helpers/strings";
import { useLanguageContext } from "./contexts/LanguageContext";

const LanguagePicker = ({ setLanguage }) => {
  const { language: currentLanguage } = useLanguageContext();

  const languageIcons = Object.entries(languageStrings).map(
    ([langCode, language]) => (
      <span
        data-test="language-icon"
        key={langCode}
        onClick={() => setLanguage(langCode)}
        style={{ color: currentLanguage === langCode ? "red" : "" }}
        className="mr-2"
      >
        {language.icon}
      </span>
    )
  );
  return <div data-test="component-language-picker">{languageIcons}</div>;
};

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default LanguagePicker;
