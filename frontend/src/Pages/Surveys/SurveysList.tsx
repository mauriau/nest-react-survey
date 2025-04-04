import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {ASurvey} from "./ASurvey.tsx";
import {useQuery} from "@tanstack/react-query";
import {useSurveyList} from "../../hooks/surveys/useSurveyList.ts";
import {Navigate} from "react-router-dom";
import { Survey } from "../../types.ts";

export const SurveyList = () => {
    const {isPending, data: surveys, error} = useQuery(
        {
            queryKey: ["surveyList",],
            queryFn: useSurveyList
        }
    );

    if (error) {
        localStorage.removeItem('token')
        return <Navigate to="/auth/login" replace/>;
    }

    if (isPending) {
        return (
            <>
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress/>
                </Box>
            </>
        )
    }

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Liste des Sondages
            </Typography>
            {surveys.map((survey: Survey) => (
                <div key={survey.id} >
                    <ASurvey  key={survey.id} survey={survey} />
                </div>
            ))}
        </Container>
    )
}