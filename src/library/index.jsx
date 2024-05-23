import { LOGIN_ROUTE } from "@/router/index.jsx";
import {
  ADMIN_SIDE_LINKS,
  ENTREPRISE_SIDE_LINKS,
  INTERVENANT_SIDE_LINKS,
  LOCAL_SIDE_LINKS,
  REGIONAL_SIDE_LINKS,
} from "@/data/sidelinks.jsx";
import { EntrepriseForm } from "@/pages/profile/EntrepriseForm.jsx";
import UserForm from "@/pages/profile/UserForm.jsx";

export const TokenName = "authToken";
export const setTokenInLocalStorage = (token) => {
  localStorage.setItem(TokenName, token);
};

export const logout = (navigate, dispatch) => {
  localStorage.removeItem(TokenName);
  dispatch({
    type: "SET_USER",
    user: null,
  });
  return navigate(LOGIN_ROUTE);
};

export const isToken = () => {
  return localStorage.getItem(TokenName);
};

export const getDashboardLinks = (role_name) => {
  switch (role_name) {
    case "central":
      return ADMIN_SIDE_LINKS;
    case "entreprise":
      return ENTREPRISE_SIDE_LINKS;
    case "local":
      return LOCAL_SIDE_LINKS;
    case "intervenant":
      return INTERVENANT_SIDE_LINKS;
    case "regional":
      return REGIONAL_SIDE_LINKS;
  }
};

export const getProfileToUpdate = (role_name) => {
  switch (role_name) {
    case "entreprise":
      return <EntrepriseForm />;
    // case 'intervenant':
    //     return INTERVENANT_SIDE_LINKS;
    case "central":
      return <UserForm />;
    case "local":
      return <UserForm />;
    case "regional":
      return <UserForm />;
    default:
      return null; // or any default value you want to return if role_name doesn't match any case
  }
};
