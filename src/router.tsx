import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import { Home } from "./pages/home";
import ProtectedRoute from "./components/protected-route";
import LoginPage from "./pages/login";
import Hashtags from "./pages/hashtags";
import Explore from "./pages/explore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faHashtag,
  faGlasses,
  faBell,
  faGear,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "./pages/notifications";
import Settings from "./pages/settings";
import Bookmarks from "./pages/bookmarks";
import Hashtaging from "./pages/hashtaging";
import Profile from "./pages/profile";
import NotFound from "./pages/not-found";
import UserProfile from "./pages/user-profile";
import Post from "./pages/post";
import CommentForm from "./pages/comment-form";
import MobileWrite from "./pages/mobile-write";

library.add(faHouse, faHashtag, faGlasses, faBell, faGear, faBookmark);
interface RouterElement {
  id: number;
  path: string;
  label: string;
  icon?: JSX.Element;
  element: React.ReactNode;
  withAuth?: boolean;
}
interface SidebarElement {
  id: number;
  label: string;
  path: string;
  icon?: JSX.Element;
}

interface HashtagElement {
  id: number;
  label: string;
  path: string;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    icon: <FontAwesomeIcon icon={faHouse} />,
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
  {
    id: 2,
    path: "/Explore",
    label: "Explore",
    icon: <FontAwesomeIcon icon={faGlasses} />,
    element: <Explore />,
    withAuth: true,
  },
  {
    id: 3,
    path: "/hashtags",
    label: "Hashtags",
    icon: <FontAwesomeIcon icon={faHashtag} />,
    element: <Hashtags />,
    withAuth: true,
  },
  {
    id: 4,
    path: "/notifications",
    label: "Notifications",
    icon: <FontAwesomeIcon icon={faBell} />,
    element: <Notifications />,
    withAuth: true,
  },
  {
    id: 5,
    path: "/settings",
    label: "Settings",
    icon: <FontAwesomeIcon icon={faGear} />,
    element: <Settings />,
    withAuth: true,
  },
  {
    id: 6,
    path: "/bookmarks",
    label: "Bookmarks",
    icon: <FontAwesomeIcon icon={faBookmark} />,
    element: <Bookmarks />,
    withAuth: true,
  },
  {
    id: 7,
    path: "/hashtaging",
    label: "Hashtaging",
    icon: <FontAwesomeIcon icon={faBookmark} />,
    element: <Hashtaging />,
    withAuth: true,
  },
  {
    id: 8,
    path: "/profile",
    label: "Profile",
    element: <Profile />,
    withAuth: true,
  },
  {
    id: 9,
    path: "/user-profile",
    label: "Profile",
    element: <UserProfile />,
    withAuth: true,
  },
  {
    id: 10,
    path: "/comment",
    label: "Comment",
    element: <CommentForm />,
    withAuth: true,
  },
  {
    id: 11,
    path: "/post",
    label: "Post",
    element: <Post />,
    withAuth: true,
  },
  {
    id: 12,
    path: "/mobile-write",
    label: "Mobile",
    element: <MobileWrite />,
    withAuth: true,
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
        errorElement: <NotFound />,
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
  if (!router.withAuth) return prev;

  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
      icon: router.icon,
    },
  ];
}, [] as SidebarElement[]);

export const HashtagContent: HashtagElement[] = [
  {
    id: 0,
    label: "#themarvels",
    path: "/hashtaging?themarvels",
  },
  {
    id: 1,
    label: "#loki2",
    path: "/hashtaging?loki2",
  },
  {
    id: 2,
    label: "#x-men",
    path: "/hashtaging?x-men",
  },
  {
    id: 3,
    label: "#echo",
    path: "/hashtaging?echo",
  },
  {
    id: 4,
    label: "#atsv",
    path: "/hashtaging?atsv",
  },
];
