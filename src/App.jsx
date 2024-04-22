import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Task from "./pages/Task";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/to-do",
    element: <Task />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
