import { Survey } from "../../types.ts";
import {
    Button,
    Paper,
    Typography,
    FormControl
} from "@mui/material";
import { useState } from "react";
import {SimpleChoice} from "./SimpleChoice.tsx";
import {MultiChoice} from "./MultiChoice.tsx";

type Props = {
    survey: Survey;
};

export function  ASurvey  ({ survey }: Props) {
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({});
    const [answered, setAnswered] = useState(false);

    const handleChange = (surveyId: string, choiceId: string) => {
        setSelectedOptions((prev) => {
            const updatedChoices = prev[surveyId] ? [...prev[surveyId]] : [];
            if (updatedChoices.includes(choiceId)) {
                return { ...prev, [surveyId]: updatedChoices.filter((c) => c !== choiceId) };
            }
            return { ...prev, [surveyId]: survey.singleResponse ? [choiceId] : [...updatedChoices, choiceId] };
        });
    };

    const handleSubmit = async (surveyId: string) => {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:3000/surveys/respond", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ surveyId, choiceIds: selectedOptions[surveyId] }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setAnswered(true);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold">
                {survey.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                {survey.description}
            </Typography>

            <FormControl component="fieldset">
                {survey.singleResponse ? (
                    <SimpleChoice survey={survey} selectedOptions={selectedOptions} handleChange={handleChange} />
                ) : (
                    <MultiChoice survey={survey} selectedOptions={selectedOptions} handleChange={handleChange} />
                )}
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={answered || !(selectedOptions[survey.id]?.length > 0)}
                onClick={() => handleSubmit(survey.id)}
            >
                {answered ? "Répondu ✅" : "Soumettre"}
            </Button>
            <Button href={`/surveys/${survey.id}/results`} style={{ textDecoration: 'none' }}>
                Voir les résultats
            </Button>
        </Paper>
    );
};
