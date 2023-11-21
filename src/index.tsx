import {createRoot} from 'react-dom/client'
import {App} from "./components/App";
import * as React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {AboutPage} from "@/pages/about";
import {ShopPage} from "@/pages/shop";
import {Suspense} from "react";

const root = document.getElementById('root');
if (!root) {
    throw new Error('root not found')
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/about",
                element: <Suspense><AboutPage/></Suspense>,
            },
            {
                path: "/shop",
                element: <Suspense><ShopPage/></Suspense>,
            }
        ]
    },
]);


const container = createRoot(root)
container.render(<RouterProvider router={router}/>)