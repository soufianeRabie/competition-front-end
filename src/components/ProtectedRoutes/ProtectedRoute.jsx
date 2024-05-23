
import { Navigate, useNavigate } from 'react-router-dom'
import {useUserContext} from "@/context/UserContext.jsx";
import {isToken, logout, TokenName} from "@/library/index.jsx";
import {LOGIN_ROUTE, redirect_to_login, redirectToDashboard} from "@/router/index.jsx";
import UserApi from "@/services/Api/UserApi.js";
import {useEffect, useState} from "react";

function ProtectedRoute({ children }) {
  const { state, dispatch } = useUserContext()
  const user = state?.user ;
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async ()=>
    {

      if (!isToken()) {
          logout(navigate , dispatch)
       return   navigate(LOGIN_ROUTE)
      }
      try {
      if (isToken() && !user) {

          UserApi.getUser().then(async (response) => {
              console.log(response)
            dispatch({
              type: 'SET_USER',
              payload:{
                user: response.data,
              }
            })
            setIsLoading(false)
          }).catch((error)=>
          {
            console.log('sui')
            setIsLoading(false)
            logout(navigate, dispatch)
          })

        }else
      {
          setIsLoading(false)
      }
      }catch (error) {
          console.log('sui')
          setIsLoading(false)
          logout(navigate, dispatch)
        }

    }

     checkAuth()

  }, []);

  if(isLoading)
  {
    return <></>
  }
  return children
}

export default ProtectedRoute
