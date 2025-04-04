import {InjectRepository} from '@nestjs/typeorm';
import {Survey} from '../entities/survey.entity';
import {Repository} from 'typeorm';
import {SurveyResponse} from '../entities/survey-response.entity';
import {CreateResponseSurveyDto} from '../dto/create-response-survey.dto';
import {RuntimeException} from '@nestjs/core/errors/exceptions';
import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from '../../users/entities/user.entity';

@Injectable()
export class RespondToASurveyService {
    constructor(
        @InjectRepository(Survey)
        private readonly surveyRepository: Repository<Survey>,
        @InjectRepository(SurveyResponse)
        private readonly surveyResponseRepository: Repository<SurveyResponse>,
    ) {
    }

    async respondToASurvey(
        createResponseSurveyDto: CreateResponseSurveyDto,
        participant: User,
    ): Promise<SurveyResponse> {
        const {surveyId, choiceIds} = createResponseSurveyDto;

        const survey = await this.surveyRepository.findOne({
            where: {id: surveyId},
            relations: ['choices'],
        });
        if (!survey) {
            throw new NotFoundException('This Survey doesnt exist');
        }
        const surveyChoices = survey.choices.map((choice) => choice.id);
        if (survey.singleResponse && choiceIds.length > 1) {
            throw new RuntimeException('This is a single choice survey');
        }
        const choiceIdsFiltered = [...new Set(choiceIds)];
        choiceIdsFiltered.forEach((id) => {
            if (!surveyChoices.includes(id)) {
                throw new RuntimeException('A choice is not in this survey');
            }
        });

        const newResponseToASurvey = new SurveyResponse();
        newResponseToASurvey.survey = survey;
        newResponseToASurvey.choices = choiceIdsFiltered;
        newResponseToASurvey.user = {...participant};

        return this.surveyResponseRepository.save(newResponseToASurvey);
    }
}
