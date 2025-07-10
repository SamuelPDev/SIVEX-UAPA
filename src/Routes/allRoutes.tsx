import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import Ecommerce from "pages/Dashboard/Ecommerce";

// Proyectos
import ProjectsForm from "pages/Project/Projects";                   // Formulario único
import ManageExtensionista from "pages/Project/ManageExtensionnista"; // Gestión Extensionista
import ManageVoluntariado from "pages/Project/ManageVoluntariado";   // Gestión Voluntariado

// Authentication
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
import Register from "pages/Authentication/Register";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import UserProfile from "pages/Authentication/user-profile";

const authProtectedRoutes = [
  // 1. Dashboard
  { path: "/dashboard", component: <Ecommerce /> },

  // 2. Redirección raíz a Dashboard
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },

  // 3. Agregar proyectos (formulario único)
  {
    path: "/agregar-proyectos",
    name: "AgregarProyectos",
    component: <ProjectsForm />,
  },

  // 4. Gestionar proyectos por categoría
  {
    path: "/gestionar-proyectos/extensionista",
    name: "GestionarExtensionista",
    component: <ManageExtensionista />,
  },
  {
    path: "/gestionar-proyectos/voluntariado",
    name: "GestionarVoluntariado",
    component: <ManageVoluntariado />,
  },

  // 5. Perfil de usuario
  {
    path: "/user-profile",
    name: "UserProfile",
    component: <UserProfile />,
  },

  // 6. Catch-all: cualquier otra ruta vuelve al Dashboard
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", name: "Login", component: <Login /> },
  { path: "/logout", name: "Logout", component: <Logout /> },
  { path: "/register", name: "Register", component: <Register /> },
  { path: "/forgot-password", name: "ForgotPassword", component: <ForgotPassword /> },
];

export { authProtectedRoutes, publicRoutes };