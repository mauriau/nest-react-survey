import { Module } from "@nestjs/common";
import { SurveysService } from "./services/surveys.service";
import { SurveysController } from "./controllers/surveys.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./entities/survey.entity";
import { Choice } from "./entities/choice.entity";
import { SurveyResponse } from "./entities/survey-response.entity";
import {SurveyResponseController} from "./controllers/survey-response.controller";
import {RespondToASurveyService} from "./services/respond-to-a-survey.service";

@Module({
  imports: [
      TypeOrmModule.forFeature([Survey, SurveyResponse, Choice])
  ],
  controllers: [SurveysController, SurveyResponseController],
  providers: [SurveysService, RespondToASurveyService],
  exports: [SurveysService, RespondToASurveyService],
})
export class SurveysModule {}
