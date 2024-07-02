import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Spinner from "../components/Common/Spinner";



const Home = React.lazy(() =>delay(  import("../pages/Home")));
const Developers = React.lazy(() =>delay(  import("../pages/Developers")));
const Developer = React.lazy(() =>delay(  import("../pages/Developer")));
const PropertyDetails = React.lazy(() =>delay(  import("../pages/Property")));
const LunchDetails = React.lazy(() =>delay(  import("../pages/LunchDetails")));
const CompoundDetails = React.lazy(() =>delay(  import("../pages/CompoundDetails")));
const AllLaunches = React.lazy(() => delay( import("../pages/AllLaunches")));
const ContactUs = React.lazy(() => delay( import("../pages/ContactUs")));
const AboutUs = React.lazy(() =>delay(  import("../pages/AboutUs")));
const OurPartners= React.lazy(() => delay( import("../pages/OurPartners")));
const AreaDetails= React.lazy(() =>delay(  import("../pages/AreaDetails")));
const SearchResults= React.lazy(() => delay( import("../pages/SearchResults")));
const Academy= React.lazy(() => delay( import("../pages/Academy")));
const SellProperty= React.lazy(() => delay( import("../pages/SellProperty")));
const PropertyComparison= React.lazy(() => delay( import("../pages/PropertyComparison")));

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
        { path: "/compare", element: <PropertyComparison /> },
      ],
    },
  ]);

  return (

    <Suspense fallback={<Spinner/>}>
      {element}
    </Suspense>
  );
};
async function delay(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}

export default ProjectRoutes;
