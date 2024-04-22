import  { lazy } from "react";

export interface CustomRoute   {
  isPrivate?: boolean;
  path: string;
  element: any;
}

const routes: CustomRoute[] = [
  {
    path: "/login",
    element: lazy(()=> import('../Screens/Auth/Login')),
  },
  {
    path: "/",
    element: lazy(()=> import('../Screens/Dashboard/Dashboard')),
    isPrivate: true, 
  },
  {
    path: "/users",
    element: lazy(()=> import('../Screens/Dashboard/Users/Users')),
    isPrivate: true, 
  },
];

export default routes;
