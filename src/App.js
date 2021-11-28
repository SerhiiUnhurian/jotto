import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import './App.css';
import Input from './Input';
import { useEffect, useState } from 'react';
import { getSecretWord } from './actions';

function App() {
  const [secretWord, setSecretWord] = useState('');
  const [guessedWords, setGuessedWords] = useState([]);

  useEffect(() => {
    setSecretWord(getSecretWord());
  }, []);
  // const handleSubmit = (value) => {
  //   setGuessedWords((guessedWords) => [
  //     ...guessedWords,
  //     { guessedWord: value, ByteLengthQueuingStrategy: 0 },
  //   ]);
  // };

  // TODO: Get props from shared state

  // const secretWord = 'party';
  // const guessedWords = [];

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <Input secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
