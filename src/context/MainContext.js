import { createContext, useState, useMemo } from 'react';

export const MainContext = createContext({
  userName: '',
  setUserName: () => {},
});

function MainContextProvider({ children }) {
  const initialState = useMemo(
    () => JSON.parse(localStorage.getItem('user')) || {},
    []
  );

  const [user, setUser] = useState(initialState);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export default MainContextProvider;
