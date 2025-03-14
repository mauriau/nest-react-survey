import { Injectable } from "@nestjs/common";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { UpdateSurveyDto } from "./dto/update-survey.dto";
import { Survey } from "./entities/survey.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Choice } from "./entities/choice.entity";

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const survey = new Survey();
    survey.title = createSurveyDto.title;
    survey.description = createSurveyDto.description;
    survey.singleResponse = createSurveyDto.singleResponse;

    survey.choices = createSurveyDto.choices.map(choice => {
      const choiceEntity = new Choice();
      choiceEntity.title = choice.title;
      choiceEntity.survey = survey;
      return choiceEntity;
    });

    return this.surveyRepository.save(survey);
  }

  findAll() {
    return `This action returns all surveys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} survey`;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}
