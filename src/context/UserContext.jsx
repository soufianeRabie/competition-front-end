import {createContext, useContext, useReducer} from "react";
import AppReducer, {initialState} from "@/context/AppReducer.js";
export const UserStateContext = createContext(initialState)
export default function UserContext({children}) {

  const [state, dispatch] = useReducer(AppReducer, initialState);


  return <>
    <UserStateContext.Provider value={{
      dispatch,
      state
    }}>
      {children}
    </UserStateContext.Provider>
  </>
}
export const useUserContext = () => useContext(UserStateContext)
