import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import { routes } from "./config";
import { DashboardScaffold } from "./components/layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.dashboard.index} element={<DashboardScaffold />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
