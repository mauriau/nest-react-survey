import { ArrayMinSize, IsArray, IsObject, IsString } from 'class-validator';

export class CreateResponseSurveyDto {
  @IsString()
  surveyId: string;

  @IsArray()
  @ArrayMinSize(1)
  choiceIds: string[];
}
