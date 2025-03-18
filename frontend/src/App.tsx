import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import AdminSurveyPage from "./Pages/AdminSurveyPage.tsx";
import SurveysPage from "./Pages/SurveysPage.tsx";
import {SurveyResults} from "./Pages/Surveys/SurveyResults.tsx";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/auth/login" replace />;

    return children;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/admin/survey" element={<PrivateRoute ><AdminSurveyPage /></PrivateRoute>} />
                <Route path="/surveys" element={<SurveysPage />} />
                <Route path="/surveys/:id/results" element={<SurveyResults />} />
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;