import {api} from "../api.ts";

export function useRespondToASurvey(surveyId: string, choiceIds: string[]) {
    return api.post(`/surveys/respond`, JSON.stringify({ surveyId, choiceIds })).then((r) => r.data.data);
}