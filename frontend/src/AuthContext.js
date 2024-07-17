import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let user = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (user != null) {
          const decodedProfile = decodeURIComponent(user);
          const jsonString = JSON.stringify(decodedProfile);
          const trimmedString = '"' + jsonString.slice(3).slice(0, -1) +  '"';;        
          const parsedObject = JSON.parse(trimmedString);
          const profile = JSON.parse(parsedObject)
          console.log(profile)
          console.log(profile.displayName)
          setIsAuthenticated(true);
          setUser(profile);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }

        const decodedProfile = decodeURIComponent(user);
        const jsonString = JSON.stringify(decodedProfile);
        const trimmedString = '"' + jsonString.slice(3).slice(0, -1) +  '"';;        
        const parsedObject = JSON.parse(trimmedString);
        const profile = JSON.parse(parsedObject)
        console.log(profile)
        console.log(profile.displayName)
        setIsAuthenticated(true);
        setUser(profile)

      } catch (error) {
        console.error('Error checking authentication', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    await fetch(process.env.REACT_APP_BACKEND_URL+`/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
