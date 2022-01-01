import PropTypes from "prop-types";

const Congrats = ({ display }) => {
  return display ? (
    <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">
        Congratulations! You guessed the word!
      </span>
    </div>
  ) : (
    <div data-test="component-congrats" />
  );
};

Congrats.propTypes = {
  display: PropTypes.bool.isRequired,
};

export default Congrats;
