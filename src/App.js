import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessedWords
        guessedWords={[{ guessedWord: 'study', letterMatchCount: 3 }]}
      />
    </div>
  );
}

export default App;
