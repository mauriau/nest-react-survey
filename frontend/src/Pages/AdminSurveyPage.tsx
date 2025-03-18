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
} from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Add, Remove } from "@mui/icons-material";
interface State extends SnackbarOrigin {
    open: boolean;
}
export default function AdminSurveyPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [choices, setChoices] = useState([""]);
    const [multipleChoice, setMultipleChoice] = useState(false);
    const [error, setError] = useState("");
    const [state, setState] = useState<State>({open: false });
    const handleAddChoice = () => {
        setChoices([...choices, ""]);
    };
    const {  open } = state;
    const handleRemoveChoice = (index: number) => {
        const updatedChoices = choices.filter((_, i) => i !== index);
        setChoices(updatedChoices);
    };

    const handleChoiceChange = (index: number, value: string) => {
        const updatedChoices = choices.map((choice, i) => (i === index ? value : choice));
        setChoices(updatedChoices);
    };

    const handleSubmit = async () => {

        if (choices.length < 1 || choices.some(choice => choice.trim() === "")) {
            setError("Veuillez ajouter au moins un choix valide.");
            return;
        }

        setError("");
        const surveyData = { title, description, choices, singleResponse: multipleChoice };
        console.log("Survey Created:", surveyData);
        const token = localStorage.getItem('token');

        const response = await fetch("http://localhost:3000/surveys", {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(surveyData)
        });

        if (!response.ok) {
            throw new Error("Identifiants incorrects");
        }
        setState({ open: true });
        window.location.reload();

    };
    const handleClose = () => {
        setState({ ...state, open: false });
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
                        anchorOrigin={{  vertical: 'top', horizontal: 'right' }}
                        open={open}
                        onClose={handleClose}
                        message="Sauvegardé"
                    />
                </Box>
            </Paper>
        </Container>
    );
};

