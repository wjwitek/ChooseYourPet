import React, { createContext, useContext, useState } from "react";

export type CurrentExpertContextType = {
  currentExpert: number | null;
  setCurrentExpert: React.Dispatch<React.SetStateAction<number | null>>;
};

const CurrentExpertContext = createContext<CurrentExpertContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const CurrentExpertProvider = ({ children }: Props) => {
  const [currentExpert, setCurrentExpert] = useState<number | null>(null);

  return (
    <CurrentExpertContext.Provider value={{ currentExpert, setCurrentExpert }}>
      {children}
    </CurrentExpertContext.Provider>
  );
};

export const useCurrentExpert = (): CurrentExpertContextType => {
  const context = useContext(CurrentExpertContext);
  if (!context) throw new Error("useCurrentExpert must be used within a CurrentExpertProvider");
  return context;
};
