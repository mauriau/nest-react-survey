import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateResponseSurveyDto } from '../dto/create-response-survey.dto';
import { RespondToASurveyService } from '../services/respond-to-a-survey.service';
import { Roles } from '../../auth/role.decorator';
import { Role } from '../../auth/role.enum';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../users/entities/user.entity';
import {validate} from "class-validator";

@Controller('surveys')
export class SurveyResponseController {
  constructor(
    private readonly respondToASurveyService: RespondToASurveyService,
  ) {}

  @Roles(Role.User)
  @Post('/respond')
  async respondToASurvey(
    @Body() createResponseSurveyDto: CreateResponseSurveyDto,
    @GetUser() user: User,
  ) {3
      const errors = await validate(createResponseSurveyDto)
      if (errors.length > 0) {
          throw new Error(`Validation failed!`)
      }
      return this.respondToASurveyService.respondToASurvey(
      createResponseSurveyDto,
      user,
    );
  }
}
