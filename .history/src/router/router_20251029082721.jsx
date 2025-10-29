import { createBrowserRouter } from "react-router";
import AdminHome from "../Dashboard/AdminHome";
import AdminSuccessStoryTable from "../Dashboard/AdminSuccessStoryTable";
import ApprovedContactRequest from "../Dashboard/ApprovedContactRequest";
import ApprovedPremium from "../Dashboard/ApprovedPremium";
import GotMarriedForm from "../Dashboard/GotMarriedForm";
import Logout from "../Dashboard/Logout";
import ManageUsers from "../Dashboard/ManageUsers";
import MyContactRequest from "../Dashboard/MyContactRequest";
import MyFavouritesBiodata from "../Dashboard/MyFavouritesBiodata";
import ViewBiodata from "../Dashboard/ViewBiodata";
import AuthLayout from "../layouts/AuthLayout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import RootLayout from "../layouts/RootLayout";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import BiodataDetails from "../pages/BiodataDetails/BiodataDetails";
import BiodataForm from "../pages/BiodataForm/BiodataForm";
import Biodatas from "../pages/Biodatas/Biodatas";
import Contact from "../pages/ContactUs/Contact";

import Payment from "../Dashboard/Payment/Payment";
import EditBioData from "../pages/EditBioData/EditBioData";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import UpdateBiodata from "../pages/UpdateBiodata/UpdateBiodata";
import PrivateRoutes from "../Routes/PrivateRoutes";
import SuccessStories from "../Dashboard/SuccessStories";
import Overview from "../Dashboard/DashboardInit";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "ai",
        Component: 
      },
      {
        path: "all-biodatas",
        Component: Biodatas,
      },
      {
        path: "about",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "/biodata/:id",
        element: (
          <PrivateRoutes>
            <BiodataDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "biodatas",
        // Component: BiodataForm,
        element: (
          <PrivateRoutes>
            <BiodataForm></BiodataForm>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "Register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    children: [
      // 🟩 User Dashboard Routes
      {
        index: true,
        element: <Overview></Overview>,
      },
      {
        path: "biodatas",
        element: <BiodataForm />,
      },

      {
        path: "edit-biodata",
        Component: EditBioData,
      },
      {
        path: "edit-biodata/:id",
        Component: UpdateBiodata,
      },
      {
        path: "view-biodata",
        element: <ViewBiodata />,
      },
      {
        path: "my-contact-request",
        element: <MyContactRequest />,
      },
      {
        path: "my-favourites",
        element: <MyFavouritesBiodata />,
      },
      {
        path: "got-married",
        element: <GotMarriedForm />,
      },
      {
        path: "sucsess",
        Component: SuccessStories,
      },

      // 🟥 Admin Dashboard Routes
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "approved-premium",
        element: <ApprovedPremium />,
      },
      {
        path: "approved-contact-request",
        element: <ApprovedContactRequest />,
      },
      {
        path: "success-stories",
        element: <AdminSuccessStoryTable />,
      },
      {
        path: "payment/:bioId",
        Component: Payment,
      },

      // 🔐 Common
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
