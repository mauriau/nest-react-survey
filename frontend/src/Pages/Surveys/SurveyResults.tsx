// SurveyResults.tsx
import React, { useEffect, useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import {useParams} from "react-router-dom";

type SurveyResult = {
    choice: string;
    count: number;
};
export const SurveyResults: React.FC= () => {
    const {id} = useParams()
    const [results, setResults] = useState<SurveyResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(
                    `http://localhost:3000/surveys/${id}/results`,
                    {
                        method: 'GET',
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                    );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setResults(data);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching the results');
            }
        };

        fetchResults();
    }, [id]);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Résultats du sondage
            </Typography>
            <List>
                {results.map((result, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`Choix: ${result.choice}`} secondary={`Nombre de votes: ${result.count}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};