import { PropTypes } from "prop-types";

const TotalGuesses = ({ totalGuesses }) => {
  return totalGuesses > 0 ? (
    <div data-test="component-total-guesses">Total guesses: {totalGuesses}</div>
  ) : null;
};

TotalGuesses.propTypes = {
  totalGuesses: PropTypes.number.isRequired,
};

export default TotalGuesses;
