import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import { useEffect } from "react";
import { getSecretWord, resetGame, setEnterSecretWord } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import TotalGuesses from "./TotalGuesses";
import NewWordButton from "./NewWordButton";
import GiveUpMessage from "./GiveUpMessage";
import EnterWordButton from "./EnterWordButton";
import EnterWordForm from "./EnterWordForm";
import ServerError from "./ServerError";

function App() {
  const serverError = useSelector((state) => state.serverError);
  const success = useSelector((state) => state.success);
  const gaveUp = useSelector((state) => state.gaveUp);
  const secretWord = useSelector((state) => state.secretWord);
  const guessedWords = useSelector((state) => state.guessedWords);
  const enterSecretWord = useSelector((state) => state.enterSecretWord);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSecretWord();
  }, []);

  const fetchSecretWord = () => dispatch(getSecretWord());

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  const handleEnterSecretWord = (event) => {
    event.preventDefault();
    dispatch(setEnterSecretWord(true));
  };

  let content;
  if (serverError) {
    content = (
      <ServerError errMessage={serverError} onClick={fetchSecretWord} />
    );
  } else if (enterSecretWord) {
    content = <EnterWordForm />;
  } else {
    content = (
      <div>
        <Congrats display={success} />
        <GiveUpMessage display={gaveUp} secretWord={secretWord} />
        <NewWordButton display={success || gaveUp} onClick={handleResetGame} />
        <Input secretWord={secretWord} />
        <GuessedWords guessedWords={guessedWords} />
        <TotalGuesses totalGuesses={guessedWords.length} />
        <EnterWordButton
          display={guessedWords.length === 0}
          onClick={handleEnterSecretWord}
        />
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      {content}
    </div>
  );
}

export default App;
