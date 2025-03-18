import { Container, Typography} from "@mui/material";
import {Survey} from "../../types.ts";
import {ASurvey} from "./ASurvey.tsx";

type Props = {
    surveys: Survey[]
}

export const SurveyList = (({surveys}: Props) => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Liste des Sondages
            </Typography>
            {surveys.map((survey) => (
                <div key={survey.id} >
                    <ASurvey  key={survey.id} survey={survey} />
                </div>
            ))}
        </Container>
    )
})