import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Handle log-in
  const login = ({id}) => {
    setUserData({ id });
    localStorage.setItem("id", id);
  };

  // Handle log-out.
  const logout = () => {
    setUserData(null);
    localStorage.removeItem("id");
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };