import { PropTypes } from "prop-types";

const GiveUpMessage = ({ secretWord }) => {
  return (
    <div data-test="component-giveup-message" className="alert alert-danger">
      <span data-test="giveup-message">
        The secret word was "{secretWord}". <br />
        Better luck next time!
      </span>
    </div>
  );
};

GiveUpMessage.propTypes = {
  secretWord: PropTypes.string,
};

export default GiveUpMessage;
