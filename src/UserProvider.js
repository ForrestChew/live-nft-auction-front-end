import { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState({
    userAddr: "",
    userBal: "",
    isAuthed: false,
  });

  return (
    <UserContext.Provider value={[authedUser, setAuthedUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
