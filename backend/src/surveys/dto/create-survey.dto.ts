import { ArrayMinSize, IsArray, IsBoolean, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ChoiceDto {
  @IsString()
  title: string;
}

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @Type(() => ChoiceDto)
  choices: ChoiceDto[];

  @IsBoolean()
  singleResponse: boolean;
}
