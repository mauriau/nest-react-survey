import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Survey } from "../../types";

type Props = {
    handleChange: (surveyId: string, value: string) => void;
    selectedOptions: { [key: string]: string[] };
    survey: Survey;
};

export const SimpleChoice = ({ handleChange, selectedOptions, survey }: Props) => {
    const currentValue = selectedOptions[survey.id]?.[0] || "";

    return (
        <RadioGroup
            value={currentValue}
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
    );
};
