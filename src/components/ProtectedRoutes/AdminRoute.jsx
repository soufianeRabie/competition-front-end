import {useUserContext} from "@/context/UserContext.jsx";
import {logout} from "@/library/index.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "@/router/index.jsx";

export const AdminRoute = ({children}) => {

    const {state ,dispatch} = useUserContext();
    const navigate = useNavigate();

    if(state?.user?.role_name !== 'central')
    {
        logout(navigate , dispatch);
    return <Navigate to={LOGIN_ROUTE}/>
    }


    return <>{children}</>
}
