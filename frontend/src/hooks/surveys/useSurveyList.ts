import {api} from "../api.ts";

export async function  useSurveyList() {
    const r = await api.get(`/surveys`);
    return r.data;
}