import React from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSurveyResult } from "../../hooks/surveys/useSurveyResult.ts";

type SurveyResult = {
  choice: string;
  count: number;
};
export const SurveyResults: React.FC = () => {
  const { id } = useParams();
  const {
    isPending,
    data: results,
    error,
  } = useQuery({
    queryKey: ["surveyResult", { id }],
    queryFn: useSurveyResult,
  });
  if (isPending) return "Loading...";

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Résultats du sondage
      </Typography>
      <List>
        {results.map((result: SurveyResult, index: number) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Choix: ${result.choice}`}
              secondary={`Nombre de votes: ${result.count}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
