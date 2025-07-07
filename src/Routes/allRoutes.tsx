import { Navigate } from "react-router-dom";
// dashboard
import Ecommerce from "pages/Dashboard/Ecommerce";

// Authentication
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
import Register from "pages/Authentication/Register";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import UserProfile from "pages/Authentication/user-profile";

const authProtectedRoutes = [
    // Dashboard
    { path: "/dashboard", component: <Ecommerce /> },
    { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
    { path: "*", component: <Navigate to="/dashboard" /> },

    //user prpfile
    { path: "/user-profile", name: "UserProfile", component: <UserProfile /> },
    // this route should be at the end of all other routes
    // eslint-disable-next-line react/display-name
    { path: "/", exact: true, name: "Navigate", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
    // Authentication
    { path: "/login", name: "Login", component: <Login /> },
    { path: "/logout", name: "Logout", component: <Logout /> },
    { path: "/register", name: "Register", component: <Register /> },
    { path: "/forgot-password", name: "ForgotPassword", component: <ForgotPassword /> },
];

export { authProtectedRoutes, publicRoutes };