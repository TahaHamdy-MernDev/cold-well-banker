import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CompoundDetails, Developer, Developers, Home, LunchDetails } from "../pages";
import PropertyDetails from "../pages/Property";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import AllLaunches from "../pages/AllLaunches";

const ProjectRoutes = () => {
 
    const element = useRoutes([
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path:"/developers", element: <Developers /> },
          { path:"/developer-details/:id", element: <Developer /> },
          { path:"/property-details/:id", element: <PropertyDetails /> },
          { path:"/launch-details/:id", element: <LunchDetails /> },
          { path:"/compound-details/:id", element: <CompoundDetails /> },
          { path:"/all-launches", element: <AllLaunches /> },
          { path:"/contact-us", element: <ContactUs /> },
          { path:"/about-us", element: <AboutUs /> },
        ],
      },

    ]);
    return element;
  };
  
  export default ProjectRoutes;