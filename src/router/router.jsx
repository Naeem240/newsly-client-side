import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
// Import pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/NotFound";
import { createBrowserRouter } from "react-router";
import AddArticle from '../pages/Articles/AddArticle';
import AllArticles from '../pages/Articles/AllArticles';
import Subscription from '../pages/Subscription/Subscription';
import MyArticles from '../pages/Articles/MyArticles';
import PremiumArticles from '../pages/PremiumArticles/PremiumArticles';
import Payment from "../pages/Subscription/Payment";
import ArticleDetails from "../pages/Articles/ArticleDetails";
import Profile from "../pages/Profile/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AllUsers from "../pages/Dashboard/AllUsers";
import DashboardAllArticles from "../pages/Dashboard/DashboardAllArticles";
import AddPublisher from "../pages/Dashboard/AddPublisher";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UpdateArticles from "../pages/Articles/UpdateArticles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      {
        path: 'add-article',
        element: <PrivateRoute><AddArticle/></PrivateRoute>
      },
      {
        path: 'articles',
        element: <AllArticles/>
      },
      {
        path: 'subscription',
        element: <PrivateRoute><Subscription/></PrivateRoute>
      },
      {
        path: 'my-articles',
        element: <PrivateRoute><MyArticles/></PrivateRoute>
      },
      {
        path: 'article/:id',
        element: <PrivateRoute><ArticleDetails/></PrivateRoute>
      },
      {
        path: 'update-article/:id',
        element: <PrivateRoute><UpdateArticles/></PrivateRoute>
      },
      {
        path: 'premium-articles',
        element: <PrivateRoute><PremiumArticles/></PrivateRoute>
      },
      {
        path: 'payment',
        element: <PrivateRoute><Payment/></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile/></PrivateRoute>
      }
      // Add other public/private user routes here
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoute><DashboardLayout /></AdminRoute>,
    children: [
      { 
        path: "",
        element: <DashboardHome /> 
      },
      {
        path: 'all-users',
        element: <AllUsers/>
      },
      {
        path: 'all-articles',
        element: <DashboardAllArticles/>
      },
      {
        path: 'add-publisher',
        element: <AddPublisher/>
      }

      // Add nested admin routes here later
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
