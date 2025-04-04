import { Container } from "@mui/material";
import {SurveyList} from "./Surveys/SurveysList.tsx";

const SurveysPage = () => {

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <SurveyList />
        </Container>
    );
};

export default SurveysPage;
