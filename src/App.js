import { useEffect, useReducer } from "react";
import { getSecretWord } from "./actions/index";
import "./App.css";
import Congrats from "./components/Congrats";
import GuessedWords from "./components/GuessedWords";
import Input from "./components/Input";
import LanguagePicker from "./components/LanguagePicker";
import Spinner from "./components/Spinner";
import { GuessedWordsProvider } from "./contexts/GuessedWordsContext";
import LanguageContext from "./contexts/LanguageContext";
import { SuccessProvider } from "./contexts/SuccessContext";

const initialState = {
  language: "en",
  secretWord: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SECRET_WORD":
      return { ...state, secretWord: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    // case 'GUESS_WORD':
    //   const success = action.payload === state.secretWord;
    //   const guessedWord = {
    //     guessedWord: action.payload,
    //     letterMatchCount: getLetterMatchCount(action.payload, state.secretWord),
    //   };
    //   return {
    //     ...state,
    //     success,
    //     guessedWords: [...state.guessedWords, guessedWord],
    //   };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSecretWord = (secretWord) => {
    dispatch({ type: "SET_SECRET_WORD", payload: secretWord });
  };

  const setLanguage = (language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };

  useEffect(() => {
    async function fetchSecretWord() {
      const secretWord = await getSecretWord();
      setSecretWord(secretWord);
    }
    fetchSecretWord();

    // alternatively
    // getSecretWord().then((secretWord) => setSecretWord(secretWord));
  }, []);

  if (!state.secretWord) {
    return <Spinner />;
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <LanguageContext.Provider value={{ language: state.language }}>
        <LanguagePicker setLanguage={setLanguage} />
        <GuessedWordsProvider>
          <SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </SuccessProvider>
          <GuessedWords />
        </GuessedWordsProvider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
