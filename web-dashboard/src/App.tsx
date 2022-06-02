import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-pure-modal/dist/react-pure-modal.min.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ToastContainer } from "react-toastify";
import { routes } from "./config";
import { DashboardScaffold } from "./components/layout";
import { LoginPage, PageUnfoundPage } from "./pages";
import { SignupPage } from "./pages/Signup";
import { ResponderContextProvider } from "./context";
// @ts-ignore
import { WidgetLoader } from "react-cloudinary-upload-widget";
import { AdminDashboardScaffold } from "./components/layout/admin";
import { ResponderAuthProvider, ResponderProtectedRoute } from "./context/responder.auth";

function App() {
    return (
        <>
            <WidgetLoader />
            <ToastContainer />
            <BrowserRouter>
                <ResponderAuthProvider>
                    {/* <ResponderContextProvider> */}
                    <Routes>
                        <Route path={`/`} element={<LoginPage />} />
                        <Route path={`/sign-in`} element={<LoginPage />} />
                        <Route path={`/sign-up`} element={<SignupPage />} />
                        {/* <ResponderProtectedRoute path={routes.dashboard.index + "/*"} element={<DashboardScaffold />} /> */}
                        <Route path={routes.dashboard.index + "/*"} element={<ResponderProtectedRoute element={<DashboardScaffold />} />} />
                    </Routes>
                    {/* <Routes>
                            <Route path={"*"} element={<PageUnfoundPage />} />
                            <Route path={routes.admin.index + "/*"} element={<AdminDashboardScaffold />} />
                        </Routes> */}
                    {/* </ResponderContextProvider> */}
                </ResponderAuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
