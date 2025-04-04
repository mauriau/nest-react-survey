import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Survey} from '../entities/survey.entity';

@Injectable()
export class SurveyResults {
    constructor(
        @InjectRepository(Survey)
        private surveyRepository: Repository<Survey>,
    ) {
    }

    async getSurveyResults(surveyId: string) {
        const survey = await this.surveyRepository.findOne({
            where: {id: surveyId},
            relations: ['choices'],
        });

        if (!survey) {
            throw new NotFoundException(`Survey with ID ${surveyId} not found`);
        }

        const responses = await survey.surveyResponse;

        const responsesArray = Array.isArray(responses) ? responses : [];

        return await Promise.all(
            survey.choices.map(async (choice) => {
                const count = responsesArray.filter((response) =>
                    response.choices.includes(choice.id),
                ).length;
                return {choice: choice.title, count};
            }),
        );
    }
}
