import React from "react";
import { Home, Login, Registro, LoginAdministrador, Administrador } from "./pages";

export const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/registro',
        element: <Registro/>
    },
    {
        path: '/loginAdministrador',
        element: <LoginAdministrador/>
    },
    
    {
        path: '/administrador',
        element: <Administrador/>
    },
]