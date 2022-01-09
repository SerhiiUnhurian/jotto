import { createContext, useContext, useMemo, useState } from "react";

const GuessedWordsContext = createContext();

const useGuessedWordsContext = () => {
  const context = useContext(GuessedWordsContext);

  if (!context) {
    throw new Error(
      "`useGuessedWordsContext` must be used inside `GuessedWordsProvider`"
    );
  }
  return context;
};

const GuessedWordsProvider = (props) => {
  const [guessedWords, setGuessedWords] = useState([]);
  // useMemo ensures that the provider value will only be updated when guessedWords array gets updated
  const value = useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);
  return <GuessedWordsContext.Provider value={value} {...props} />;
};

export { GuessedWordsProvider, useGuessedWordsContext };
