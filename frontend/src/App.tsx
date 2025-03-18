import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./Pages/LoginPage.tsx";
import AdminSurveyPage from "./Pages/AdminSurveyPage.tsx";
import SurveysPage from "./Pages/SurveysPage.tsx";

const PrivateRoute = ({ children, roleRequired }) => {
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            setUserRole(decodedToken.role);
        }
    }, [token]);

    if (!token) return <Navigate to="/auth/login" replace />;

    return children;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/admin/survey" element={<PrivateRoute roleRequired="admin"><AdminSurveyPage /></PrivateRoute>} />
                <Route path="/surveys" element={<SurveysPage />} />
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;