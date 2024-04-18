import App from '../App';
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />
  }
];

const router = createBrowserRouter(routes);

export default router;