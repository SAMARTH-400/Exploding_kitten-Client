import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import './index.css'
import store from './store'
import App from './pages/App'
import Game from './pages/Game'
import LeaderBoard from './pages/LeaderBoard'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
        path: "/leaderboard",
        element: <LeaderBoard />,
    },
    {
        path: "/game",
        element: <Game />,
    }
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>    
    </React.StrictMode>,
)
