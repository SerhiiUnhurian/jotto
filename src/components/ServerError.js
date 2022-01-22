import { PropTypes } from "prop-types";

const ServerError = ({ errMessage, onClick }) => {
  return (
    <>
      <div data-test="component-server-error" className="alert alert-danger">
        There was an error retrieving the secret word. Please try again later.{" "}
        <br />
        Error: {errMessage}
      </div>
      <button
        data-test="try-again-btn"
        className="btn btn-secondary"
        onClick={onClick}
      >
        Try again
      </button>
    </>
  );
};

ServerError.propTypes = {
  errMessage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ServerError;
