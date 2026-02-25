import { createContext, useContext, useState } from "react";
import FlashMsg from "../components/Flashmsg/FlashMsg";

const FlashContext = createContext();

export const useFlash = () => useContext(FlashContext);

export const FlashProvider = ({ children }) => {
  const [flashes, setFlashes] = useState([]);

  const showFlash = (type, message, duration = 5000) => {
    const id = crypto.randomUUID();
    //setFlash({ type, message });

    setFlashes((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setFlashes((prev) => prev.filter((flash) => flash.id !== id));
    }, duration);

    // setTimeout(() => {
    //   setFlash(null);
    // }, duration);
  };

  // const hideFlash = () => setFlash(null);

  const hideFlash = (id) => {
    setFlashes((prev) => prev.filter((flash) => flash.id !== id));
  };

  return (
    <FlashContext.Provider value={{ showFlash }}>
      {children}
      {/* {flash && (
        <FlashMsg
          type={flash.type}
          message={flash.message}
          onClose={hideFlash}
        />
      )} */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {flashes.map((flash) => (
          <FlashMsg
            key={flash.id}
            type={flash.type}
            message={flash.message}
            onClose={() => hideFlash(flash.id)}
          />
        ))}
      </div>
    </FlashContext.Provider>
  );
};
