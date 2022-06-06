import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./assets/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-pure-modal/dist/react-pure-modal.min.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ToastContainer } from "react-toastify";
import { keys, routes } from "./config";
import { DashboardScaffold } from "./components/layout";
import { AdminLoginPage, LoginPage, PageUnfoundPage } from "./pages";
import { SignupPage } from "./pages/Signup";
import { AdminAuthProvider, AdminProtectedRoute, ResponderContextProvider } from "./context";
// @ts-ignore
import { WidgetLoader } from "react-cloudinary-upload-widget";
import { AdminDashboardScaffold } from "./components/layout/admin";
import { ResponderAuthProvider, ResponderProtectedRoute } from "./context/responder.auth";
import socketClient from "socket.io-client";
import { NotificationsHandler } from "./utils";

export const io = socketClient(process.env.REACT_APP_API_URL!);

function App() {
    return (
        <>
            <WidgetLoader />
            <ToastContainer />
            <BrowserRouter>
                <ResponderAuthProvider>
                    <Routes>
                        <Route path={`/`} element={<Navigate replace to={"dashboard"} />} />
                        <Route path={`/sign-in`} element={<LoginPage />} />
                        <Route path={`/sign-up`} element={<SignupPage />} />
                        <Route path={routes.dashboard.index + "/*"} element={<ResponderProtectedRoute element={<DashboardScaffold />} />} />
                    </Routes>
                    <NotificationsHandler io={io} />
                </ResponderAuthProvider>
                <AdminAuthProvider>
                    <Routes>
                        <Route path="/admin" element={<Navigate replace to={routes.admin.overview} />} />
                        <Route path={`/admin/sign-in`} element={<AdminLoginPage />} />
                        <Route path={routes.admin.overview + "/*"} element={<AdminProtectedRoute element={<AdminDashboardScaffold />} />} />
                    </Routes>
                </AdminAuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
