import { User } from "../../users/entities/user.entity";
import { Survey } from "./survey.entity";
import { ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique, Column, Entity } from "typeorm";
import { PrimaryColumn } from "typeorm/browser";
import { Choice } from "./choice.entity";

@Entity()
@Unique(["survey, user"])
export class SurveyResponse {
  /*@PrimaryColumn()
  @ManyToOne(() => User, user => user.surveyResponse)
  @JoinColumn({name: "user_id", referencedColumnName: "ID"})
  user: User;*/

  @PrimaryColumn()
  @ManyToOne(() => Survey, survey => survey.id)
  @JoinColumn({name: "survey_id", referencedColumnName: "ID"})
  survey: Survey;

  @Column()
  respondedAt: Date;

  @Column({ type: "json" })
  choices: Choice[];
}
