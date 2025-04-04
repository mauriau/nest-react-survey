import {api} from "../api.ts";

export async function  useSurveyList() {
    const r = await api.get(`/surveys`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return r.data;
}