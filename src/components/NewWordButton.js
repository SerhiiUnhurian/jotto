import { PropTypes } from 'prop-types';

const NewWordButton = ({ success, onClick }) => {
  return success ? (
    <button
      className="btn btn-primary mb-2"
      data-test="component-new-word-btn"
      onClick={onClick}
    >
      New Word
    </button>
  ) : null;
};

NewWordButton.propTypes = {
  success: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NewWordButton;
