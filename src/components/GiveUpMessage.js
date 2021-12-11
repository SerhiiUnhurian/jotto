const GiveUpMessage = ({ gaveUp, secretWord }) => {
  return gaveUp ? (
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

export default GiveUpMessage;
