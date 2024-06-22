import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Spinner from "../components/Common/Spinner";
import SellProperty from "../pages/SellProperty";


const Home = React.lazy(() => import("../pages/Home"));
const Developers = React.lazy(() => import("../pages/Developers"));
const Developer = React.lazy(() => import("../pages/Developer"));
const PropertyDetails = React.lazy(() => import("../pages/Property"));
const LunchDetails = React.lazy(() => import("../pages/LunchDetails"));
const CompoundDetails = React.lazy(() => import("../pages/CompoundDetails"));
const AllLaunches = React.lazy(() => import("../pages/AllLaunches"));
const ContactUs = React.lazy(() => import("../pages/ContactUs"));
const AboutUs = React.lazy(() => import("../pages/AboutUs"));
const OurPartners= React.lazy(() => import("../pages/OurPartners"));
const AreaDetails= React.lazy(() => import("../pages/AreaDetails"));
const SearchResults= React.lazy(() => import("../pages/SearchResults"));
const Academy= React.lazy(() => import("../pages/Academy"));

const ProjectRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/developers", element: <Developers /> },
        { path: "/developer-details/:id", element: <Developer /> },
        { path: "/property-details/:id", element: <PropertyDetails /> },
        { path: "/launch-details/:id", element: <LunchDetails /> },
        { path: "/compound-details/:id", element: <CompoundDetails /> },
        { path: "/area-details/:id", element: <AreaDetails /> },
        { path: "/all-launches", element: <AllLaunches /> },
        { path: "/contact-us", element: <ContactUs /> },
        { path: "/our-partners", element: <OurPartners /> },
        { path: "/about-us", element: <AboutUs /> },
        { path: "/search-results", element: <SearchResults /> },
        { path: "/academy", element: <Academy /> },
        { path: "/sell-property", element: <SellProperty /> },
      ],
    },
  ]);

  return (

    <Suspense fallback={<Spinner/>}>
      {element}
    </Suspense>
  );
};

export default ProjectRoutes;
