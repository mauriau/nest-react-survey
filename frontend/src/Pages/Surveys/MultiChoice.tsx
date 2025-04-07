import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Survey } from "../../types.ts";

type Props = {
  handleChange: (surveyId: string, value: string) => void;
  selectedOptions: { [key: string]: string[] };
  survey: Survey;
};

export const MultiChoice = ({
  handleChange,
  selectedOptions,
  survey,
}: Props) => {
  return (
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
  );
};
