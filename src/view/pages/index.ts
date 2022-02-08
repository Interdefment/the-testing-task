// Core
import { lazy } from 'react';

export const Login = lazy(() => import(/* webpackChunkName: "LoginPage" */ './Login/LoginPage'));
export const ResetPassword = lazy(() => import(/* webpackChunkName: "RegisterPage" */ './ResetPassword/ResetPasswordPage'));
export const Home = lazy(() => import(/* webpackChunkName: "HomePage" */ './Home/HomePage'));
