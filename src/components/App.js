import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { useEffect } from 'react';
import { getSecretWord, resetGame, setEnterSecretWord } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import TotalGuesses from './TotalGuesses';
import NewWordButton from './NewWordButton';
import GiveUpMessage from './GiveUpMessage';
import EnterWordButton from './EnterWordButton';
import EnterWordForm from './EnterWordForm';

function App() {
  const success = useSelector((state) => state.success);
  const gaveUp = useSelector((state) => state.gaveUp);
  const secretWord = useSelector((state) => state.secretWord);
  const guessedWords = useSelector((state) => state.guessedWords);
  const enterSecretWord = useSelector((state) => state.enterSecretWord);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, []);

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  const handleEnterSecretWord = (event) => {
    event.preventDefault();

    dispatch(setEnterSecretWord(true));
  };

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      {enterSecretWord ? (
        <EnterWordForm />
      ) : (
        <>
          <Congrats success={success} />
          <GiveUpMessage gaveUp={gaveUp} secretWord={secretWord} />
          <NewWordButton
            display={success || gaveUp}
            onClick={handleResetGame}
          />
          <Input secretWord={secretWord} />
          <GuessedWords guessedWords={guessedWords} />
          <TotalGuesses totalGuesses={guessedWords.length} />
          <EnterWordButton
            display={guessedWords.length === 0}
            onClick={handleEnterSecretWord}
          />
        </>
      )}
    </div>
  );
}

export default App;
