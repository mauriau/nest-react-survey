import {api} from "../api.ts";
import {createSurveyDto} from "../../types.ts";

export function useCreateSurvey(surveyData: createSurveyDto){
    return api.post('/surveys', surveyData,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then((r) => r.data.data);
}