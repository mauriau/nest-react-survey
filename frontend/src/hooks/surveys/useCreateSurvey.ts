import {api} from "../api.ts";
import {createSurveyDto} from "../../types.ts";

export async function useCreateSurvey(surveyData){
    console.log('useCreateSurvey')

    return api.post('/surveys', {surveyData},{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then((r) => r.data.data);
}