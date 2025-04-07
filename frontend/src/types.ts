export interface Choice {
    id: string;
    title: string;
    survey: Survey;
}

export interface  SurveyResponse {
    user: User;
    survey: Survey;
    respondedAt: Date;
    choices: string[];
}

export interface SurveyResponseDto {
    surveyId: string;
    choices: string[];
}

export enum Role {
    User = 'user',
    Admin = 'admin',
}

export interface User {
    sub: string;
    username: string;
    roles: string;
    iat?: number;
    exp?: number;
}


export interface  Survey {
    id: string,
    title: string,
    description: string,
    singleResponse: boolean
    choices: Choice[],
    surveyResponse: SurveyResponse[]
}

export interface createSurveyDto { title: string, description: string, choices: string[], singleResponse: boolean };