import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Contact from "./components/contact";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
