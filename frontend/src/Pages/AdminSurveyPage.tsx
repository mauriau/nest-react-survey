import { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    Checkbox,
    FormControlLabel,
    IconButton,
    Snackbar,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import {useCreateSurvey} from "../hooks/surveys/useCreateSurvey.ts";
import {createSurveyDto} from "../types.ts";

interface State {
    open: boolean;
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
}
export default function AdminSurveyPage() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [choices, setChoices] = useState<string[]>([""]);
    const [multipleChoice, setMultipleChoice] = useState<boolean>(false);
    const [snackbarState, setSnackbarState] = useState<State>({ open: false, vertical: "top", horizontal: "right" });

    const { mutateAsync, error } = useMutation(
        {
            mutationFn: (surveyData: createSurveyDto) => useCreateSurvey(surveyData),
            mutationKey: ["useCreateSurvey", {title}],
            onSuccess: () => {
                setSnackbarState({ ...snackbarState, open: true });
                setChoices([])
                setTitle("")
                setDescription("")
                setMultipleChoice(false)
            }
        }
    )

    const handleAddChoice = () => {
        setChoices([...choices, ""]);
    };

    const handleRemoveChoice = (index) => {
        setChoices(choices.filter((_, i) => i !== index));
    };

    const handleChoiceChange = (index, value) => {
        setChoices(choices.map((choice, i) => (i === index ? value : choice)));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (choices.length < 1 || choices.some((choice) => choice.trim() === "")) {
            throw new Error("Veuillez ajouter au moins un choix valide.");
        }

        const surveyData = { title, description, choices, singleResponse: multipleChoice };
        mutateAsync(surveyData);
    };

    const handleCloseSnackbar = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };


    return (
        <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Paper elevation={6} sx={{ p: 5, width: "100%", maxWidth: 500, textAlign: "center", borderRadius: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Création de sondage
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Titre"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={multipleChoice} onChange={(e) => setMultipleChoice(e.target.checked)} />}
                        label="Autoriser les réponses multiples"
                    />
                    <Box display="flex" flexDirection="column" gap={1}>
                        {choices.map((choice, index) => (
                            <Box key={index} display="flex" alignItems="center" gap={1}>
                                <TextField
                                    label={`Choix ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    value={choice}
                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                />
                                <IconButton onClick={() => handleRemoveChoice(index)} disabled={choices.length <= 1}>
                                    <Remove />
                                </IconButton>
                            </Box>
                        ))}
                        <Button startIcon={<Add />} onClick={handleAddChoice}>
                            Ajouter un choix
                        </Button>
                    </Box>
                    {error && <Typography color="error">{error}</Typography>}
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        Valider le sondage
                    </Button>
                    <Snackbar
                        anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
                        open={snackbarState.open}
                        onClose={handleCloseSnackbar}
                        message="Sauvegardé"
                    />
                </Box>
            </Paper>
        </Container>
    );
}