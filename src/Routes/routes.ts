import  { lazy } from "react";

export interface CustomRoute   {
  isPrivate?: boolean;
  path: string;
  name: string;
  element: any;
}

const routes: CustomRoute[] = [
  {
    path: "/login",
    element: lazy(()=> import('../Screens/Auth/Login')),
    name: 'Login'
  },
  {
    path: "/",
    element: lazy(()=> import('../Screens/Dashboard/Dashboard')),
    isPrivate: true, 
    name: 'Dashboard'

  },
  {
    path: "/users",
    element: lazy(()=> import('../Screens/Dashboard/Users/Users')),
    isPrivate: true, 
    name: 'Users'

  },
  {
    path: "/profile/edit",
    element: lazy(()=> import('../Screens/Dashboard/Profile/Profile')),
    isPrivate: true, 
    name: 'User Profile'

  },
];

export default routes;
