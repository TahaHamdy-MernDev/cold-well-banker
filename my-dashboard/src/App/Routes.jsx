import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import {
  CreateDeveloper,
  CreateArea,
  CreateCompound,
  CreateType,
  CreateProperty,
  CreateLaunch,
  ShowAllAreas,
  UpdateArea,
  ShowAllCompounds,
  ShowAllDevelopers,
  ShowAllLaunches,
  UpdateCompound,
  UpdateDeveloper,
  UpdateType,
  ShowAllProperties,
  UpdateProperty,
  ShowAllTypes,
  UpdateLaunch,
  SellPropertyRequests,
  AcademyRequests,
  ContactRequests,
  PropertyContactRequests,
} from "../pages";

const Home = () => {
  return <h3>Home</h3>;
};
export default function ProjectRoutes() {
  const routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        // Area
        { path: "create-area", element: <CreateArea /> },
        { path: "update-area/:id", element: <UpdateArea /> },
        { path: "show-all-areas", element: <ShowAllAreas /> },
        // Compound
        { path: "create-compound", element: <CreateCompound /> },
        { path: "update-compound/:id", element: <UpdateCompound /> },
        { path: "show-all-compounds", element: <ShowAllCompounds /> },
        //  Developer
        { path: "create-developer", element: <CreateDeveloper /> },
        { path: "update-developer/:id", element: <UpdateDeveloper /> },
        { path: "show-all-developers", element: <ShowAllDevelopers /> },
        //  Types
        { path: "create-type", element: <CreateType /> },
        { path: "update-type/:id", element: <UpdateType /> },
        { path: "show-all-types", element: <ShowAllTypes /> },
        // Properties
        { path: "create-property", element: <CreateProperty /> },
        { path: "update-property/:id", element: <UpdateProperty /> },
        { path: "show-all-properties", element: <ShowAllProperties /> },
        //  Launches
        { path: "create-launch", element: <CreateLaunch /> },
        { path: "update-launch/:id", element: <UpdateLaunch /> },
        { path: "show-all-launches", element: <ShowAllLaunches /> },
        // Requests
        { path: "academy-requests", element: <AcademyRequests /> },
        { path: "contact-requests", element: <ContactRequests /> },
        { path: "sell-requests", element: <SellPropertyRequests /> },
        { path: "property-requests", element: <PropertyContactRequests /> },
      ],
    },
  ];

  return useRoutes(routes);
}
