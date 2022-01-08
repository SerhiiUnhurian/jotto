import { createContext, useContext } from "react";

const LanguageContext = createContext({ language: "en" });

export const useLanguageContext = () => useContext(LanguageContext);

export default LanguageContext;
