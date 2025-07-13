'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WeekContextType {
  currentWeek: string;
  setCurrentWeek: (week: string) => void;
}

const WeekContext = createContext<WeekContextType | undefined>(undefined);

export const WeekProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentWeek, setCurrentWeek] = useState('CW29'); // Default to CW29

  return (
    <WeekContext.Provider value={{ currentWeek, setCurrentWeek }}>
      {children}
    </WeekContext.Provider>
  );
};

export const useWeek = () => {
  const context = useContext(WeekContext);
  if (context === undefined) {
    throw new Error('useWeek must be used within a WeekProvider');
  }
  return context;
};
