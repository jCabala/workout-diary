import { createContext, useContext, useState } from 'react';
import { auth } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

const User = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(auth?.currentUser);

  onAuthStateChanged(auth, currentUser => {
    console.log(currentUser);
    setUser(currentUser);
  });

  return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
};

export const useUserState = () => useContext(User);
export default UserContext;
