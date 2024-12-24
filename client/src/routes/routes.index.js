import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import CSVParser from "../components/CSVParser/CSVParser";
import RazorpayComponent from "../components/RazorpayComponent/RazorpayComponent";
import AdminOrderSummary from "../pages/adminOrderSummary/AdminOrderSummary";

const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            ...{
              width: 1,
              zIndex: 9999,
              position: "fixed",
              top: "50vh",
              left: "50vw",
            },
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/user",
      element: <MainLayout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "cart",
          element: <UserCart />,
        },
        {
          path: "checkout",
          element: <UserCheckout />,
        },
        {
          path: "orderSummary/:id",
          element: <UserOrderSummary />,
        },
        {
          path: "dashboard",
          element: <UserDashboard />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "orderSummary/:id",
          element: <AdminOrderSummary />,
        },
      ],
    },
    {
      path: "/delivery",
      element: <MainLayout />,
      children: [
        {
          path: "dashboard",
          element: <DeliveryDashboard />,
        },
      ],
    },
    {
      // {
      //   path:'/test',
      //   element: <CSVParser/>
      // }
      path: "/test",
      element: <RazorpayComponent />,
    },
  ]);
}

//layouts
const MainLayout = Loadable(
  lazy(() => import("../layouts/mainLayout/mainLayout.component"))
);

const AdminLayout = Loadable(
  lazy(() => import("../layouts/adminLayout/adminLayout.component"))
);

const Landing = Loadable(
  lazy(() => import("../pages/landing/landing.component"))
);

const Home = Loadable(
  lazy(() => import("../pages/userHomepage/userHomepage.component"))
);

const UserCart = Loadable(
  lazy(() => import("../pages/userCart/userCart.component"))
);

const UserCheckout = Loadable(
  lazy(() => import("../pages/userCheckout/userCheckout.component"))
);

const UserOrderSummary = Loadable(
  lazy(() => import("../pages/userOrderSummary/userOrderSummary.component"))
);

const UserDashboard = Loadable(
  lazy(() => import("../pages/userDashboard/userDashboard.component"))
);

//admin routes
const AdminDashboard = Loadable(
  lazy(() => import("../pages/adminDashboard/adminDashboard.component"))
);
const DeliveryDashboard = Loadable(
  lazy(() => import("../pages/deliveryDashboard/deliveryDashboard.component"))
);
