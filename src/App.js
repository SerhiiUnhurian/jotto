import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import "./App.css";
import Input from "./Input";
import { useEffect, useReducer } from "react";
import { getSecretWord } from "./actions/index";
import React from "react";
import Spinner from "./Spinner";
import LanguageContext from "./contexts/LanguageContext";
import LanguagePicker from "./LanguagePicker";
import { getLetterMatchCount } from "./helpers";

const initialState = {
  language: "en",
  secretWord: null,
  success: false,
  guessedWords: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SECRET_WORD":
      return { ...state, secretWord: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "GUESS_WORD":
      const success = action.payload === state.secretWord;
      const guessedWord = {
        guessedWord: action.payload,
        letterMatchCount: getLetterMatchCount(action.payload, state.secretWord),
      };
      return {
        ...state,
        success,
        guessedWords: [...state.guessedWords, guessedWord],
      };
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

  const guessWord = (word) => {
    dispatch({ type: "GUESS_WORD", payload: word });
  };

  useEffect(() => {
    // async function fetchSecretWord() {
    //   const secretWord = await getSecretWord();
    //   setSecretWord(secretWord);
    // }
    // fetchSecretWord();

    // getSecretWord().then((secretWord) => setSecretWord(secretWord));
    getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return <Spinner />;
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <LanguageContext.Provider value={{ language: state.language }}>
        <LanguagePicker setLanguage={setLanguage} />
        <Congrats success={state.success} />
        <Input
          secretWord={state.secretWord}
          success={state.success}
          onSubmit={guessWord}
        />
        <GuessedWords guessedWords={state.guessedWords} />
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
