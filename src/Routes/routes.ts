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
  {
    path: "/propertyListing",
    element: lazy(()=> import('../Screens/Dashboard/PropertyListing/PropertyListing')),
    isPrivate: true, 
    name: 'Property Listing'

  },
  {
    path: "/propertyForm/editProperty",
    element: lazy(()=> import('../Screens/Dashboard/PropertyForm/PropertyForm')),
    isPrivate: true, 
    name: 'Property Form'

  },
];

export default routes;
