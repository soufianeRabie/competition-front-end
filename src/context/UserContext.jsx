import {createContext, useContext, useState} from "react";
import UserApi from "../services/Api/UserApi.js";

export const UserStateContext = createContext({
  user: {},
  authenticated: false,
  setUser: () => {
  },
  logout: () => {
  },
  login: (email, password) => {
  },
  setAuthenticated: () => {
  },
  setToken: () => {
  },
})
export default function UserContext({children}) {
  const [user, setUser] = useState({})
  const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))

  const login = async (email, password) => {
    return UserApi.login(email, password)
  }
  const logout = () => {
    setUser({})
    setAuthenticated(false)
  }

  const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated)
    window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
  }

  const setToken = (token) => {
    window.localStorage.setItem('token', token)
  }

  return <>
    <UserStateContext.Provider value={{
      user,
      login,
      logout,
      setUser,
      authenticated,
      setAuthenticated,
      setToken
    }}>
      {children}
    </UserStateContext.Provider>
  </>
}
export const useUserContext = () => useContext(UserStateContext)
