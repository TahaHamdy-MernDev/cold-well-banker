import React from 'react'
import { useRoutes } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import { CreateDeveloper,CreateArea, CreateCompound, CreateType, CreateProperty } from '../pages';

const Home = ()=>{
    return (
        <h3>Home</h3>
    )
}
export default function ProjectRoutes() {
    const routes = [
        {
          path: '/',
          element: <MainLayout />,
          children: [
            { path: 'create-area', element: <CreateArea /> },
            // { path: 'update-area', element: <UpdateArea /> },
            // { path: 'show-all-areas', element: <ShowAllAreas /> },
            { path: 'create-compound', element: <CreateCompound /> },
            // { path: 'update-compound', element: <UpdateCompound /> },
            // { path: 'show-all-compounds', element: <ShowAllCompounds /> },
            { path: 'create-developer', element: <CreateDeveloper /> },
            // { path: 'update-developer', element: <UpdateDeveloper /> },
            // { path: 'show-all-developers', element: <ShowAllDevelopers /> },
            { path: 'create-type', element: <CreateType /> },
            // { path: 'update-type', element: <UpdateType /> },
            // { path: 'show-all-types', element: <ShowAllTypes /> },
            { path: 'create-property', element: <CreateProperty /> },
            // { path: 'update-property', element: <UpdateProperty /> },
            // { path: 'show-all-properties', element: <ShowAllProperties /> },
          ],
        },
      ];
    
      return useRoutes(routes);
}
