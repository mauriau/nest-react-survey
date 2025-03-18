import { Controller, Get, Param } from '@nestjs/common';
import { SurveyResults } from '../services/survey-results.service';

@Controller('surveys')
export class SurveyResultsController {
  constructor(private readonly surveyResults: SurveyResults) {}

  @Get(':id/results')
  getSurveyResults(@Param('id') id: string) {
    return this.surveyResults.getSurveyResults(id);
  }
}
