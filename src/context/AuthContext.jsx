import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();
const EDIT_PASSWORD = "MBMully26!";

export function AuthProvider({ children }) {
  const [isEditMode, setIsEditMode] = useState(
    () => sessionStorage.getItem("mully-edit") === "true"
  );

  const login = useCallback((password) => {
    if (password === EDIT_PASSWORD) {
      sessionStorage.setItem("mully-edit", "true");
      setIsEditMode(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("mully-edit");
    setIsEditMode(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isEditMode, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
