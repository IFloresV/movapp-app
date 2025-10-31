import { createContext, ReactNode, useContext, useState } from "react";

const RegisterContext = createContext<any>(null);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
   const [acceptedTerms, setAcceptedTerms] = useState(false);
   const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

   return (
      <RegisterContext.Provider value={{ acceptedTerms, setAcceptedTerms, acceptedPrivacy, setAcceptedPrivacy }}>
         {children}
      </RegisterContext.Provider>
   );
};

export const useRegister = () => useContext(RegisterContext);
