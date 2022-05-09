import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { routes } from "./config";
import { DashboardScaffold } from "./components/layout";
import { LoginPage } from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/login`} element={<LoginPage />} />
                <Route path={routes.dashboard.index + "/*"} element={<DashboardScaffold />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
