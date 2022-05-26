import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./assets/styles/global.css";
import { ToastContainer } from "react-toastify";
import { routes } from "./config";
import { DashboardScaffold } from "./components/layout";
import { LoginPage } from "./pages";
import { SignupPage } from "./pages/Signup";
import { ResponderContextProvider } from "./context";

function App() {
    return (
        <ResponderContextProvider>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path={`/login`} element={<LoginPage />} />
                    <Route path={`/signup`} element={<SignupPage />} />
                    <Route path={routes.dashboard.index + "/*"} element={<DashboardScaffold />} />
                </Routes>
            </BrowserRouter>
        </ResponderContextProvider>
    );
}

export default App;
