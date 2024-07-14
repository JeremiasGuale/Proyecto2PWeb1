import React from 'react';
import Home from '../components/home/Home'

export { Home }

export const Login = React.lazy(() => import('../components/login/Login'));
export const Registro = React.lazy(() => import('../components/register/Registro'));
export const LoginAdministrador = React.lazy(() => import('../components/login/LoginAdministrador'));
export const Administrador = React.lazy(() => import('../components/administrador/Administrador'));



