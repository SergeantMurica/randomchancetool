import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar} from "./components";
import HomePage from "./pages/HomePage";
import ToolsPage from "./pages/ToolsPage";
import AboutPage from "./pages/AboutPage";
import './utils/sounds';

const App: React.FC = () => {
    // You could also add sound settings here
    useEffect(() => {
        // You might want to enable sound based on user preference
        const soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
        if (!soundEnabled) {
            // Disable sound globally if user preference is to have it off
            import('./utils/SoundManager').then(({ setGlobalVolume }) => {
                setGlobalVolume(0);
            });
        }
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tools" element={<ToolsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
