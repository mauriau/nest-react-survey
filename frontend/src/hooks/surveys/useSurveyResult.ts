import {api} from "../api.ts";

export const useSurveyResult = (async ({ queryKey }) => {
    const [_key, { id }] = queryKey
    console.log(_key, id)
    const r = await api
        .get(`/surveys/${id}/results`);
    return r.data;
})
