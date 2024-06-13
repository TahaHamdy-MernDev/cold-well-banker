import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Lazy-loaded components
const Home = React.lazy(() => import("../pages/Home"));
const Developers = React.lazy(() => import("../pages/Developers"));
const Developer = React.lazy(() => import("../pages/Developer"));
const PropertyDetails = React.lazy(() => import("../pages/Property"));
const LunchDetails = React.lazy(() => import("../pages/LunchDetails"));
const CompoundDetails = React.lazy(() => import("../pages/CompoundDetails"));
const AllLaunches = React.lazy(() => import("../pages/AllLaunches"));
const ContactUs = React.lazy(() => import("../pages/ContactUs"));
const AboutUs = React.lazy(() => import("../pages/AboutUs"));

const ProjectRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense> },
        { path:"/developers", element: <Suspense fallback={<div>Loading...</div>}><Developers /></Suspense> },
        { path:"/developer-details/:id", element: <Suspense fallback={<div>Loading...</div>}><Developer /></Suspense> },
        { path:"/property-details/:id", element: <Suspense fallback={<div>Loading...</div>}><PropertyDetails /></Suspense> },
        { path:"/launch-details/:id", element: <Suspense fallback={<div>Loading...</div>}><LunchDetails /></Suspense> },
        { path:"/compound-details/:id", element: <Suspense fallback={<div>Loading...</div>}><CompoundDetails /></Suspense> },
        { path:"/all-launches", element: <Suspense fallback={<div>Loading...</div>}><AllLaunches /></Suspense> },
        { path:"/contact-us", element: <Suspense fallback={<div>Loading...</div>}><ContactUs /></Suspense> },
        { path:"/about-us", element: <Suspense fallback={<div>Loading...</div>}><AboutUs /></Suspense> },
      ],
    },
  ]);

  return element;
};

export default ProjectRoutes;
