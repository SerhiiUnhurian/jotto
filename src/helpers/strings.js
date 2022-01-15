export const languageStrings = {
  en: {
    icon: "🇺🇸 en",
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessedWords: "Guesses",
    numberColumnHeader: "№",
    guessColumnHeader: "Guessed Words",
    matchingLettersColumnHeader: "Matching Letters",
    totalGuesses: "Total Guesses",
  },
  emoji: {
    icon: "😊 emoji",
    congrats: "🎯🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🔤",
    guessInputPlaceholder: "⌨️🤔",
    guessedWords: "🤷‍🔤",
    numberColumnHeader: "🔢",
    guessColumnHeader: "🤷‍",
    matchingLettersColumnHeader: "✅",
    totalGuesses: "🔢🤷‍♀️",
  },
};

export default function getStringByLanguage(
  languageCode,
  key,
  strings = languageStrings
) {
  if (!strings[languageCode] || !strings[languageCode][key]) {
    console.warn(
      `Could not get string for ${languageCode} language or ${key} key. Fall back to 'en'.`
    );
    return strings["en"][key];
  }
  return strings[languageCode][key];
}
