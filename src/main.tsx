import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import MainPage from './pages/MainPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import BoxPage from './pages/BoxPage.tsx'
import BoxEditPage from './pages/BoxEditPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "box/:id",
        children: [
          {
            index: true,
            element: <BoxPage />
          },
          {
            path: "edit",
            element: <BoxEditPage />
          }
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
