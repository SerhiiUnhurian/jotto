import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { useEffect } from 'react';
import { getSecretWord } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const success = useSelector((state) => state.success);
  const secretWord = useSelector((state) => state.secretWord);
  const guessedWords = useSelector((state) => state.guessedWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, []);

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
