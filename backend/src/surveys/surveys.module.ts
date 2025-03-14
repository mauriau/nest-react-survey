import { Module } from "@nestjs/common";
import { SurveysService } from "./surveys.service";
import { SurveysController } from "./surveys.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./entities/survey.entity";
import { Choice } from "./entities/choice.entity";
import { SurveyResponse } from "./entities/survey-response.entity";

@Module({
  controllers: [SurveysController],
  exports: [SurveysService],
  imports: [TypeOrmModule.forFeature([Survey, Choice, SurveyResponse])],
  providers: [SurveysService],
})
export class SurveysModule {}
