import React, { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  currentUser: string | null;
  setCurrentUser: (user: string | null) => void;
}

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(
    localStorage.getItem('currentUser') || null
  );

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Ошибка');
  }
  return context;
};
