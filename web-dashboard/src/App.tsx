import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/global.css";
import "./App.css";
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
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

function App() {
    return (
        <>
            <WidgetLoader />
            <ResponderContextProvider>
                <ToastContainer />
                <BrowserRouter>
                    <Routes>
                        <Route path={"*"} element={<PageUnfoundPage />} />
                        <Route path={`/`} element={<LoginPage />} />
                        <Route path={`/sign-in`} element={<LoginPage />} />
                        <Route path={`/sign-up`} element={<SignupPage />} />
                        <Route path={routes.dashboard.index + "/*"} element={<DashboardScaffold />} />
                    </Routes>
                </BrowserRouter>
            </ResponderContextProvider>
        </>
    );
}

export default App;
