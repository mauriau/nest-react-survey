import { User } from "../../users/entities/user.entity";
import { Survey } from "./survey.entity";
import {ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique, Column, Entity, PrimaryColumn} from "typeorm";
import { Choice } from "./choice.entity";

@Entity()
@Unique(["survey", "user"])
export class SurveyResponse {
  @PrimaryColumn({type: "varchar", name: "user_id"})
  @ManyToOne(() => User, user => user.surveyResponse)
  @JoinColumn({name: "user_id", referencedColumnName: "id"})
  user: User;

  @PrimaryColumn({type: "varchar", name: "survey_id"})
  @ManyToOne(() => Survey, survey => survey.surveyResponse)
  @JoinColumn({name: "survey_id", referencedColumnName: "id"})
  survey: Survey;

  @Column()
  respondedAt: Date;

  @Column({ type: "json" })
  choices: Choice[];
}
