import BuildingsComponent from "../components/BuildingsComponent";
import ContentWrapper from "../components/ContentWrapper";
import DashboardComponent from "../components/DashboardComponent";
import LoginComponent from "../components/LoginComponent";
import ProfileComponent from "../components/ProfileComponent";
import BillComponent from "../components/BillComponent";
import ContactUs from "../components/ContactUs";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component

export default [
    {
        path: '/',
        element: <ContentWrapper/>
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardComponent />
            </PrivateRoute>
        )
    },
    {
        path: '/login',
        element: <LoginComponent/>
    },
    {
        path: '/buildings',
        element: (
            <PrivateRoute>
                <BuildingsComponent />
            </PrivateRoute>
        )
    },
    {
        path: '/profile',
        element: (
            <PrivateRoute>
                <ProfileComponent />
            </PrivateRoute>
        )
    },
    {
        path: '/bills',
        element: (
            <PrivateRoute>
                <BillComponent />
            </PrivateRoute>
        )
    },
    {
        path: '/contact_us',
        element: <ContactUs/>
    }
];
