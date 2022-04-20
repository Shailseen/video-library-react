import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { IconAside } from "../components/Asides/IconAside/IconAside";

const AsideContext = createContext();

const useAside = () => useContext(AsideContext);

const AsideProvider = ({ children }) => {
  const [aside, setAside] = useState([false, true]);
  return (
    <AsideContext.Provider value={{ aside, setAside }}>
      {children}
    </AsideContext.Provider>
  );
};

export { useAside, AsideProvider };
