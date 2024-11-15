import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            {
                path:'',
                Component:HomePage
            },
            {
                path:'login',
                Component:LoginPage
            },
            {
                path:'register',
                Component:Register
            }
        ]

    }
])