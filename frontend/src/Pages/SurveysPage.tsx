import { useState, useEffect } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import {SurveyList} from "./Surveys/SurveysList.tsx";
import {Navigate} from "react-router-dom";

const SurveysPage = () => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/surveys', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setSurveys(result);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'An error occurred');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if(error){
        localStorage.removeItem('token')
        return <Navigate to="/auth/login" replace />;
    }

    if(loading){
        return (
            <>
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            </>
        )
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <SurveyList surveys={surveys} />
        </Container>
    );
};

export default SurveysPage;
