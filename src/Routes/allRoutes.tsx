import React from "react";
import { Navigate } from "react-router-dom";

// Dashboard
import Ecommerce from "pages/Dashboard/Ecommerce";

// Crear proyectos
import ProjectsForm from "pages/Project/Projects";
import AddStudent   from "pages/Student/AddStudent";

// Listados
import ManageExtensionista from "pages/Project/ManageExtensionista";
import ManageVoluntariado  from "pages/Project/ManageVoluntariado";
import ManageStudents   from "pages/Student/ManageStudents";

// Edición
import EditProject from "pages/Project/EditProject";
import EditStudent      from "pages/Student/EditStudent";

// Authentication
import Login         from "pages/Authentication/Login";
import Logout        from "pages/Authentication/Logout";
import Register      from "pages/Authentication/Register";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import UserProfile   from "pages/Authentication/user-profile";


const authProtectedRoutes = [
  // 1) Dashboard
  { path: "/dashboard", component: <Ecommerce /> },

  // 2) Formulario único para agregar
  { path: "/agregar-proyectos", component: <ProjectsForm /> },

  // 3) Listados por categoría
  {
    path: "/gestionar-proyectos/extensionista",
    component: <ManageExtensionista />,
  },
  {
    path: "/gestionar-proyectos/voluntariado",
    component: <ManageVoluntariado />,
  },

  // 4) Ruta de edición (¡debe ir antes del "*")
  {
    path: "/editar-proyectos/:category/:id",
    component: <EditProject />,
  },

  // 5) Perfil
  { path: "/user-profile", component: <UserProfile /> },

  // 6) Redirecciones
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
  { path: "*", component: <Navigate to="/dashboard" /> },

  // Estudiantes
  { path: "/agregar-estudiante",    component: <AddStudent /> },
  { path: "/gestionar-estudiantes", component: <ManageStudents /> },
  { path: "/editar-estudiante/:id", component: <EditStudent /> },
];

const publicRoutes = [
  { path: "/login",           component: <Login /> },
  { path: "/logout",          component: <Logout /> },
  { path: "/register",        component: <Register /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
];

export { authProtectedRoutes, publicRoutes };