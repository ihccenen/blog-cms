import { useState, createContext } from 'react';
import { logoutUser } from '../api/user';

export const UserContext = createContext<IUserCtx>({} as IUserCtx);

const localStorageUser = localStorage.getItem('user');
const initialUser = localStorageUser ? JSON.parse(localStorageUser) : null;

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(initialUser);

  const login = (user: IUser) => {
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    logoutUser()
      .then(() => {
        setCurrentUser(null);
        localStorage.removeItem('user');
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <UserContext.Provider value={{ user: currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
