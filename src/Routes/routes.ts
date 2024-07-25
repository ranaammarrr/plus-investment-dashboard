import { lazy } from "react";

export interface CustomRoute {
  isPrivate?: boolean;
  path: string;
  name: string;
  element: any;
}

const routes: CustomRoute[] = [
  {
    path: "/login",
    element: lazy(() => import("../Screens/Auth/Login")),
    name: "Login",
  },
  {
    path: "/",
    element: lazy(() => import("../Screens/Dashboard/Home/Home")),
    isPrivate: true,
    name: "Dashboard",
  },
  {
    path: "/users",
    element: lazy(() => import("../Screens/Dashboard/Users/Users")),
    isPrivate: true,
    name: "Users",
  },
  {
    path: "/profile/edit",
    element: lazy(() => import("../Screens/Dashboard/Profile/Profile")),
    isPrivate: true,
    name: "User Profile",
  },
  {
    path: "/propertyListing",
    element: lazy(
      () => import("../Screens/Dashboard/PropertyListing/PropertyListing")
    ),
    isPrivate: true,
    name: "Property Listings",
  },
  {
    path: "/propertyDetails",
    element: lazy(
      () => import("../Screens/Dashboard/PropertyDetails/PropertyDetails")
    ),
    isPrivate: true,
    name: "Property Details",
  },
  {
    path: "/transactions",
    element: lazy(
      () => import("../Screens/Dashboard/Transaction/Transactions")
    ),
    isPrivate: true,
    name: "Transactions",
  },
  {
    path: "/counter-offers",
    element: lazy(
      () => import("../Screens/Dashboard/CounterOffers/CounterOffers")
    ),
    isPrivate: true,
    name: "Counter Offers",
  },

  {
    path: "/propertyForm/editProperty",
    element: lazy(
      () => import("../Screens/Dashboard/PropertyForm/PropertyForm")
    ),
    isPrivate: true,
    name: "Edit Property",
  },
  // {
  //   path: "/pages/faq",
  //   element: lazy(()=> import('../Screens/Dashboard/Pages/Faq')),
  //   isPrivate: true,
  //   name: 'Frequently Asked Questions'

  // },
  {
    path: "/pages/privacy",
    element: lazy(() => import("../Screens/Dashboard/Pages/PrivacyPolicy")),
    isPrivate: true,
    name: "Privacy Policy",
  },
  {
    path: "/pages/terms",
    element: lazy(
      () => import("../Screens/Dashboard/Pages/TermsAndConditions")
    ),
    isPrivate: true,
    name: "Terms And Conditions",
  },
  {
    path: "/propertyForm/addProperty",
    element: lazy(
      () => import("../Screens/Dashboard/PropertyListing/AddProperty")
    ),
    isPrivate: true,
    name: "Add Property",
  },
  {
    path: "/chat",
    element: lazy(() => import("../Screens/Dashboard/Chat/Chat")),
    isPrivate: true,
    name: "Chat",
  },
  {
    path: "/timeline",
    element: lazy(() => import("../Screens/Dashboard/Timeline/Timeline")),
    isPrivate: true,
    name: "Timeline",
  },
  {
    path: "/feeds",
    element: lazy(() => import("../Screens/Dashboard/Timeline/TimelineFeeds")),
    isPrivate: true,
    name: "Timeline",
  },
  {
    path: "/category",
    element: lazy(() => import("../Screens/Dashboard/Category/Category")),
    isPrivate: true,
    name: "Category",
  },
  {
    path: "/propertyType",
    element: lazy(
      () => import("../Screens/Dashboard/PropertyListing/PropertyType")
    ),
    isPrivate: true,
    name: "Property Type",
  },
  {
    path: "/view-counter-offer",
    element: lazy(
      () => import("../Screens/Dashboard/CounterOffers/DetailedCounterOffer")
    ),
    isPrivate: true,
    name: "",
  },
  {
    path: "/viewTransactions",
    element: lazy(
      () => import("../Screens/Dashboard/Transaction/ViewTransactions")
    ),
    isPrivate: true,
    name: "Transactions",
  },
  {
    path: "/counterOffer",
    element: lazy(
      () => import("../Screens/Dashboard/Transaction/CounterOffer")
    ),
    isPrivate: true,
    name: "Transactions",
  },
  {
    path: "/invoices",
    element: lazy(() => import("../Screens/Dashboard/Invoices/Invoices")),
    isPrivate: true,
    name: "Invoices",
  },
  {
    path: "/insights",
    element: lazy(
      () => import("../Screens/Dashboard/Timeline/TimelineInsights")
    ),
    isPrivate: true,
    name: "Timeline Insights",
  },
  {
    path: "/tickets",
    element: lazy(() => import("../Screens/Dashboard/Tickets/Tickets")),
    isPrivate: true,
    name: "Tickets",
  },
  {
    path: "/verifications",
    element: lazy(
      () => import("../Screens/Dashboard/Verifications/Verifications")
    ),
    isPrivate: true,
    name: "Verifications",
  },
];

export default routes;
