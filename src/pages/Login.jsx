import UserLogin from "@/components/Auth/UserLogin.jsx";
import {useUserContext} from "@/context/UserContext.jsx";
import {isToken} from "@/library/index.jsx";
import {redirectToDashboard} from "@/router/index.jsx";

export const Login = () => {

    const {state} =   useUserContext()
    const user = state?.user ;

    if(user || isToken())
    {
      return   redirectToDashboard();
    }
    return (
        <>
        <UserLogin/>
        </>
    )
}
