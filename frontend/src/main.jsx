import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import { Homepage } from "./root/Homepage.jsx";
import { Profile } from "./root/Profile.jsx";
import { Recipes } from "./root/Recipes.jsx";
import { YourCookbook } from "./root/YourCookbook.jsx";
import { Login } from './root/Login.jsx';
import { CreateAccount } from './root/CreateAccount.jsx';

export const ORANGE = "#FF9800";
export const LIGHTGREEN = "#D9EDBF";
export const GREEN = "#90D26D";

const router = createBrowserRouter([
  {path: "/",
  element: <Login/>,
  },
  {path: "/CreateAccount",
  element: <CreateAccount/>,
  },
  {path: "/Homepage",
  element: <Homepage/>,
  },
  {path: "/Profile",
  element: <Profile/>,
  },
  {path: "/Recipes",
  element: <Recipes />,
  },
  {path: "/YourCookbook",
  element: <YourCookbook />,
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
