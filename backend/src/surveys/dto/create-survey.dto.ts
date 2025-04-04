import {
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsString,
    ValidateNested,
} from 'class-validator';

export class CreateSurveyDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    choices: string[];

    @IsBoolean()
    singleResponse: boolean;
}
