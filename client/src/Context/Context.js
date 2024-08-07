import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const ContextShare = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [pokedata, setPokedata] = useState([]);

  useEffect(() => {
    console.log('Context updated:', { users, pokedata }); // Log context changes
  }, [users, pokedata]);

  return (
    <UserContext.Provider value={{ users, setUsers, pokedata, setPokedata }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextShare;