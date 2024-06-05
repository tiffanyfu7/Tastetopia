import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryProvider } from './components/QueryProvider.jsx'
import { RecipeProvider } from './components/RecipeProvider.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import { Homepage } from "./root/Homepage.jsx";
import { Profile } from "./root/Profile.jsx";
import { Recipes } from "./root/Recipes.jsx";
import { YourCookbook } from "./root/YourCookbook.jsx";
import { CreateRecipe } from "./root/CreateRecipe.jsx";
import RecipeSearched from './components/RecipeSearched.jsx';
import { RecipeDetail } from './components/RecipeDetail.jsx';

export const ORANGE = "#FF9800";
export const LIGHTGREEN = "#D9EDBF";
export const GREEN = "#90D26D";

const router = createBrowserRouter([
  {path: "/",
  element: <Homepage/>,
  },
  {path: "/Profile",
  element: <Profile/>,
  },
  {path: "/Recipes/:q",
  element: <RecipeSearched />
  },
  {path: "/Recipes/:q/:id",
  element: <RecipeDetail />
  },
  {path: "/YourCookbook",
  element: <YourCookbook />,
  },
  {path: "/CreateRecipe",
  element: <CreateRecipe />,
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryProvider>
    <RecipeProvider>
      <RouterProvider router={router} />
    </RecipeProvider>
  </QueryProvider>,
)
