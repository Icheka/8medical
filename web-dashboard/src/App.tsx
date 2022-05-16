import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./assets/styles/global.css";
import { routes } from "./config";
import { DashboardScaffold } from "./components/layout";
import { LoginPage } from "./pages";
import { SignupPage } from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/login`} element={<LoginPage />} />
                <Route path={`/signup`} element={<SignupPage />} />
                <Route path={routes.dashboard.index + "/*"} element={<DashboardScaffold />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
