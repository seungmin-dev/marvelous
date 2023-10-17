import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import { Home } from "./pages/home";
import ProtectedRoute from "./components/protected-route";
import LoginPage from "./pages/login";

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  withAuth?: boolean;
}
interface SidebarElement {
  id: number;
  label: string;
  path: string;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home />,
    withAuth: true,
  },
  {
    id: 1,
    path: "/login",
    label: "Login",
    element: <LoginPage />,
    withAuth: false,
  },
];

export const routers = createBrowserRouter(
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: (
          <ProtectedRoute>
            <Layout>{router.element}</Layout>
          </ProtectedRoute>
        ),
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  })
);

export const SidebarContent = routerData.reduce((prev, router) => {
  console.log(router);
  if (!router.withAuth) return prev;

  console.log(prev);

  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
    },
  ];
}, [] as SidebarElement[]);
