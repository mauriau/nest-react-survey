import { ArrayMinSize, IsArray, IsBoolean, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class Choice {
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
  @Type(() => Choice)
  choices: Choice[];

  @IsBoolean()
  singleResponse: boolean;
}
