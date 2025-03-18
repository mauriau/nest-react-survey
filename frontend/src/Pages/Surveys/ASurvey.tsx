import { Survey } from "../../types.ts";
import {
    Button,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Typography,
    Checkbox,
    FormGroup,
    FormControl
} from "@mui/material";
import { useState } from "react";

type Props = {
    survey: Survey;
};

export const  ASurvey = ({ survey }: Props): React.FC<Props> => {
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string[] }>({});
    const [answered, setAnswered] = useState(false);

    const handleChange = (surveyId: number, choiceId: string) => {
        setSelectedOptions((prev) => {
            const updatedChoices = prev[surveyId] ? [...prev[surveyId]] : [];
            if (updatedChoices.includes(choiceId)) {
                return { ...prev, [surveyId]: updatedChoices.filter((c) => c !== choiceId) };
            } else {
                return { ...prev, [surveyId]: survey.singleResponse ? [choiceId] : [...updatedChoices, choiceId] };
            }
        });
    };

    const handleSubmit = async (surveyId: number) => {
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
                    <RadioGroup
                        value={selectedOptions[survey.id]?.[0] || ""}
                        onChange={(e) => handleChange(survey.id, e.target.value)}
                    >
                        {survey.choices.map((choice) => (
                            <FormControlLabel
                                key={choice.id}
                                value={choice.id}
                                control={<Radio />}
                                label={choice.title}
                            />
                        ))}
                    </RadioGroup>
                ) : (
                    <FormGroup>
                        {survey.choices.map((choice) => (
                            <FormControlLabel
                                key={choice.id}
                                control={
                                    <Checkbox
                                        checked={selectedOptions[survey.id]?.includes(choice.id) || false}
                                        onChange={() => handleChange(survey.id, choice.id)}
                                    />
                                }
                                label={choice.title}
                            />
                        ))}
                    </FormGroup>
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
