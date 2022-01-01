import { PropTypes } from "prop-types";

const GiveUpMessage = ({ display, secretWord }) => {
  return display ? (
    <div data-test="component-giveup-message" className="alert alert-danger">
      <span data-test="giveup-message">
        The secret word was "{secretWord}". <br />
        Better luck next time!
      </span>
    </div>
  ) : (
    <div data-test="component-giveup-message" />
  );
};

GiveUpMessage.propTypes = {
  display: PropTypes.bool.isRequired,
  secretWord: PropTypes.string,
};

export default GiveUpMessage;
