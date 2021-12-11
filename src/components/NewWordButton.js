import { PropTypes } from 'prop-types';

const NewWordButton = ({ display, onClick }) => {
  return display ? (
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
  display: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NewWordButton;
