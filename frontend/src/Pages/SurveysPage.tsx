import { Container } from "@mui/material";
import { SurveyList } from "./Surveys/SurveysList.tsx";

export const SurveysPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <SurveyList />
    </Container>
  );
};
