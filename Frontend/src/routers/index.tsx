import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
    //todo FE
    { path : "/", element : <div className="text-blue-700" > Home </div> },
    
    //todo BE
    {path : "/admin", element : <div>
        LayOut Admin <Outlet />
    </div>, children : [
        {
            index : true,
            element : <Navigate to={"dashboard"} />
        },
        {
            path : "dashboard",
            element : <div>Dashboard</div>
        },
        {
            path : "product",
            element : <div>Product List</div>
        },
        {
            path : "product/:id",
            element : <div>Product Detail</div>
        },
    ]}
])
