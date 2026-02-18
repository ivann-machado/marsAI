import { createContext, useContext, useState } from "react";
import FlashMsg from "../components/Flashmsg/FlashMsg";

const FlashContext = createContext();

export const useFlash = () => useContext(FlashContext);

export const FlashProvider = ({ children }) => {
  const [flash, setFlash] = useState(null);

  const showFlash = (type, message, duration = 30000) => {
    setFlash({ type, message });

    setTimeout(() => {
      setFlash(null);
    }, duration);
  };

  const hideFlash = () => setFlash(null);

  return (
    <FlashContext.Provider value={{ showFlash }}>
      {children}
      {flash && (
        <FlashMsg
          type={flash.type}
          message={flash.message}
          onClose={hideFlash}
        />
      )}
    </FlashContext.Provider>
  );
};
