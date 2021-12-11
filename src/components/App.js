import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { useEffect } from 'react';
import { getSecretWord, resetGame } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import TotalGuesses from './TotalGuesses';
import NewWordButton from './NewWordButton';
import GiveUpMessage from './GiveUpMessage';

function App() {
  const success = useSelector((state) => state.success);
  const gaveUp = useSelector((state) => state.gaveUp);
  const secretWord = useSelector((state) => state.secretWord);
  const guessedWords = useSelector((state) => state.guessedWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, []);

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <GiveUpMessage gaveUp={gaveUp} secretWord={secretWord} />
      <NewWordButton display={success || gaveUp} onClick={handleResetGame} />
      <Input secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
      <TotalGuesses totalGuesses={guessedWords.length} />
    </div>
  );
}

export default App;
