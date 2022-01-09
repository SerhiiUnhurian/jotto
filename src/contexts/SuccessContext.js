import { createContext, useContext, useMemo, useState } from "react";

const SuccessContext = createContext();

const useSuccessContext = () => {
  const context = useContext(SuccessContext);

  if (!context) {
    throw new Error(
      "`useSuccessContext` must be used inside `SuccessProvider` component."
    );
  }
  return context;
};

const SuccessProvider = (props) => {
  const [success, setSuccess] = useState(false);
  const value = useMemo(() => [success, setSuccess], [success]);
  return <SuccessContext.Provider value={value} {...props} />;
};

export { SuccessProvider, useSuccessContext };
