import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound.jsx";
import Layout from "../layouts/Layout.jsx";
// import GuestLayout from "../layouts/GuestLayout.jsx";
// import StudentDashboardLayout from "../layouts/StudentDashboardLayout.jsx";
// import StudentDashboard from "../components/Student/StudentDashboard.jsx";
// import AdminDashboardLayout from "../layouts/AdminDashboardLayout.jsx";
// import AdminDashboard from "../components/Admin/Pages/AdminDashboard.jsx";
// import TeacherDashboardLayout from "../layouts/TeacherDashboardLayout.jsx";
// import TeacherDashboard from "../components/Teacher/TeacherDashboard.jsx";
// import ManageParents from "../components/Admin/Pages/ManageParents.jsx";
// import ParentDashboardLayout from "../layouts/ParentDashboardLayout.jsx";
// import ManageStudents from "../components/Admin/Pages/ManageStudents.jsx";
// import UserLogin from "@/components/Auth/UserLogin.jsx";
import { Login } from "@/pages/Login.jsx";
import AppShell from "@/components/app-shell.jsx";
import Dashboard from "@/pages/dashboard/index.jsx";

import IntervenantList from "@/components/data-table/Tables/IntervenantsList.jsx";
import CertificationsList from "../components/data-table/Tables/CertificationsList.jsx";
import ProtectedRoute from "@/components/ProtectedRoutes/ProtectedRoute.jsx";
import SettingsProfile from "@/pages/profile/index.jsx";
// import AddIntervenant from "@/components/CRUD/RegioCentreManager/Intervenant/AddIntervenant.jsx";
import ThemesList from "../components/data-table/Tables/ThemesList.jsx";
import CompetencesList from "../components/data-table/Tables/CompetencesList.jsx";

import ThemeIntervenants from "../components/CRUD/RegioCentreManager/OffreFormation(Themes)/ThemeIntervenants.jsx";
import ResetPasswordPage from "@/components/Auth/ResetPasswordPage.jsx";
import UsersList from "@/components/data-table/Tables/UsersList.jsx";
import {AdminRoute} from "@/components/ProtectedRoutes/AdminRoute.jsx";
import ActionsList from "@/components/data-table/Tables/Actions.jsx";

export const LOGIN_ROUTE = "/login";
export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";
const ADMIN_BASE_ROUTE = "/admin";
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + "/dashboard";
export const ADMIN_MANAGE_PARENTS_ROUTE = ADMIN_BASE_ROUTE + "/manage-parents";
export const ADMIN_MANAGE_STUDENTS_ROUTE =
  ADMIN_BASE_ROUTE + "/manage-students";
export const TEACHER_DASHBOARD_ROUTE = "/teacher/dashboard";
export const PARENT_DASHBOARD_ROUTE = "/parent/dashboard";
export const HOME_ROUTE = "/home";
export const DESIGNATION_ROUTE_INTERVENANT_TABLE = "/themeIntervenants";
export const redirectToDashboard = () => {
  return <Navigate to={HOME_ROUTE} />;
};

export const redirect_to_login = () => {
  return <Navigate to={LOGIN_ROUTE} />;
};
export const router = createBrowserRouter([
    // {
    //     path : '/',
    //     element : redirect_to_login()
    // },
    {
        element: <Layout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/reset-password/:token',
                element: <ResetPasswordPage/>
            }


        ],

    },
    {
        element: <ProtectedRoute >
            <AppShell/></ProtectedRoute>
        ,
            children: [
                {
                    path: HOME_ROUTE,
                    element: <Dashboard/>
                },
                {
                    path: 'users',
                    element: <AdminRoute roles={['central']}>
                        <UsersList/>
                    </AdminRoute>

                },

                {
                    path: 'intervenants',
                    element:<AdminRoute roles={['central' ,'regional']}>
                        <IntervenantList/>
                    </AdminRoute>
                },
                {
                    path: "certifications",
                    element: <CertificationsList />,
                },

                {
                    path: "themes",
                    element: <ThemesList />,
                },
                {
                    path: DESIGNATION_ROUTE_INTERVENANT_TABLE,
                    element: <ThemeIntervenants />,
                },
                {
                    path: "competences",
                    element: <CompetencesList />,
                },

                {
                    path: 'actions',
                    element: <ActionsList/>
                },
                {
                    path: 'profile',
                    element: <SettingsProfile/>
                }
            ]
    }



])
