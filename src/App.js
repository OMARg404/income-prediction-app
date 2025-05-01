import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AnalyticsPage from "./components/AnalyticsPage";
import PredictionPage from "./components/PredictionPage";

function App() {
    return ( <
        Router >
        <
        Navbar / >
        <
        Routes >
        <
        Route path = "/"
        element = { < HomePage / > }
        /> <
        Route path = "/analytics"
        element = { < AnalyticsPage / > }
        /> <
        Route path = "/prediction"
        element = { < PredictionPage / > }
        />  < /
        Routes > <
        /Router>
    );
}

export default App;