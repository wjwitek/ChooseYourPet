import React, { createContext, useContext, useState } from "react";

export type ExpertContextType = {
  currentExpert: number;
  setCurrentExpert: React.Dispatch<React.SetStateAction<number>>;
  maxExperts: number | null;
  setMaxExperts: React.Dispatch<React.SetStateAction<number | null>>;
};

const CurrentExpertContext = createContext<ExpertContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const ExpertContextProvider = ({ children }: Props) => {
  const [currentExpert, setCurrentExpert] = useState<number>(1);
  const [maxExperts, setMaxExperts] = useState<number | null>(null);

  return (
    <CurrentExpertContext.Provider value={{ currentExpert, setCurrentExpert, maxExperts, setMaxExperts }}>
      {children}
    </CurrentExpertContext.Provider>
  );
};

export const useExpert = (): ExpertContextType => {
  const context = useContext(CurrentExpertContext);
  if (!context) throw new Error("useCurrentExpert must be used within a CurrentExpertProvider");
  return context;
};
