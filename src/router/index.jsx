import {createBrowserRouter} from "react-router-dom";
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
import {Login} from "@/pages/Login.jsx";

export const LOGIN_ROUTE = '/login'
export const STUDENT_DASHBOARD_ROUTE = '/student/dashboard'
const ADMIN_BASE_ROUTE = '/admin'
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + '/dashboard'
export const ADMIN_MANAGE_PARENTS_ROUTE = ADMIN_BASE_ROUTE + '/manage-parents'
export const ADMIN_MANAGE_STUDENTS_ROUTE = ADMIN_BASE_ROUTE + '/manage-students'
export const TEACHER_DASHBOARD_ROUTE = '/teacher/dashboard'
export const PARENT_DASHBOARD_ROUTE = '/parent/dashboard'
export const redirectToDashboard = (roleType) => {
    switch (roleType) {
        case 'student':
            return (STUDENT_DASHBOARD_ROUTE);
        case 'admin':
            return (ADMIN_DASHBOARD_ROUTE)
        case 'teacher':
            return (TEACHER_DASHBOARD_ROUTE)
        case 'parent':
            return (PARENT_DASHBOARD_ROUTE)
    }
}
export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Login/>
            },
            {
                path: '*',
                element: <NotFound/>
            },
        ]
    },
    // {
    //     element: <GuestLayout/>,
    //     children: [
    //         {
    //             path: LOGIN_ROUTE,
    //             element: <Login/>
    //         },
    //     ]
    // },
    // {
    //     element: <StudentDashboardLayout/>,
    //     children: [
    //         {
    //             path: STUDENT_DASHBOARD_ROUTE,
    //             element: <StudentDashboard/>
    //         },
    //     ]
    // },
    // {
    //     element: <AdminDashboardLayout/>,
    //     children: [
    //         {
    //             path: ADMIN_DASHBOARD_ROUTE,
    //             element: <AdminDashboard/>
    //         },
    //         {
    //             path: ADMIN_MANAGE_STUDENTS_ROUTE,
    //             element: <ManageStudents/>
    //         },
    //         {
    //             path: ADMIN_MANAGE_PARENTS_ROUTE,
    //             element: <ManageParents/>
    //         },
    //     ]
    // },
    // {
    //     element: <ParentDashboardLayout/>,
    //     children: [
    //         {
    //             path: PARENT_DASHBOARD_ROUTE,
    //             element: <AdminDashboard/>
    //         },
    //     ]
    // },
    // {
    //     element: <TeacherDashboardLayout/>,
    //     children: [
    //         {
    //             path: TEACHER_DASHBOARD_ROUTE,
    //             element: <TeacherDashboard/>
    //         },
    //     ]
    // }

])
