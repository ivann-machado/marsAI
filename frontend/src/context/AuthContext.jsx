import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useauth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [sessionExpiration, setSessionExpiration] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //check si user est logged in}
    const stored = localStorage.getItem("auth");

    if (stored) {
      const { storedUser, storedRole, storedExpiration, storedToken } =
        JSON.parse(stored);

      if (Date.now() < storedExpiration * 1000) {
        setUser(storedUser);
        setUserRole(storedRole);
        setSessionExpiration(storedExpiration);
        setToken(storedToken);
      } else {
        localStorage.removeItem("auth");
      }
    }

    // si on veut verifier dans la DB que le token est toujours valide
    /* fetch("/api/check-auth")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((e) => {
        // redirection vers page login
        setLoading(false); // à enlever quand le verification de l'auth fonctionne bien
      }); */
    setLoading(false);
  }, []);

  const login = (
    loggedInUser,
    loggedInRole,
    sessionExpiration,
    sessionToken,
  ) => {
    setUser(loggedInUser);
    setUserRole(loggedInRole);
    setSessionExpiration(sessionExpiration);
    setToken(sessionToken);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        storedUser: loggedInUser,
        storedRole: loggedInRole,
        storedExpiration: sessionExpiration,
        storedToken: sessionToken,
      }),
    );

    //console.log(localStorage.getItem("auth"));
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
    setSessionExpiration(null);
    setToken(null);

    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userRole, token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
