import { PropTypes } from 'prop-types';

const EnterWordButton = ({ display, onClick }) => {
  return (
    display && (
      <button
        onClick={onClick}
        data-test="component-enter-word-btn"
        className="btn btn-primary mt-5"
      >
        Enter Secret Word
      </button>
    )
  );
};

EnterWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EnterWordButton;
