import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: localStorage.getItem('isAuthenticated'),
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown action');
  }
}

const FAKE_USER = {
  name: 'Rohan',
  email: 'rohan@example.com',
  password: 'qwertyaszxc',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      localStorage.setItem('user', JSON.stringify(FAKE_USER));
      localStorage.setItem('isAuthenticated', true);

      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');

    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
