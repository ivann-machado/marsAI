import { createContext, useContext, useEffect, useState } from "react";
import { useFlash } from "./FlashContext.jsx";

const AuthContext = createContext();

export function useauth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [sessionExpiration, setSessionExpiration] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showFlash } = useFlash();

  useEffect(() => {
    //check si user est logged in}
    const stored = localStorage.getItem("auth");

    if (stored) {
      const {
        storedId,
        storedUser,
        storedRole,
        storedExpiration,
        storedToken,
      } = JSON.parse(stored);

      if (Date.now() < storedExpiration * 1000) {
        setId(storedId);
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
    loggedInId,
    loggedInUser,
    loggedInRole,
    sessionExpiration,
    sessionToken,
  ) => {
    setId(loggedInId);
    setUser(loggedInUser);
    setUserRole(loggedInRole);
    setSessionExpiration(sessionExpiration);
    setToken(sessionToken);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        storedId: loggedInId,
        storedUser: loggedInUser,
        storedRole: loggedInRole,
        storedExpiration: sessionExpiration,
        storedToken: sessionToken,
      }),
    );

    //console.log(localStorage.getItem("auth"));
  };

  const logout = async () => {
    // ENVOIE REQUETE LOGOUT ICI
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        showFlash("error", "Logout failed.");
        //throw new Error("Erreur lors de la connexion");
        return;
      }

      setId(null);
      setUser(null);
      setUserRole(null);
      setSessionExpiration(null);
      setToken(null);
      localStorage.removeItem("auth");
      showFlash("success", "Logged out.");
    } catch (err) {
      showFlash("error", "Logout failed!");
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ id, user, login, logout, userRole, token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
