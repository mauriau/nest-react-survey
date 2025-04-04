import {api} from "../api.ts";

export async function useRespondToASurvey(surveyId: string, choiceIds: string[]) {
    return api.post(`/surveys/respond`, { surveyId, choiceIds },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((r) => r.data.data);
}