import { Survey } from "../entities/survey.entity";
import { Choice } from "../entities/choice.entity";
import { IsArray, IsObject } from "class-validator";

export class CreateResponseSurveyDto {
  @IsObject()
  survey: Survey;

  @IsArray()
  choices: Choice[];
}
