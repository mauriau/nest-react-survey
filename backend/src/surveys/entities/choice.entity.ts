import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm/browser";
import { Survey } from "./survey.entity";

@Entity()
export class Choice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Survey, survey => survey.choices)
  @JoinColumn({name: 'survey_id', referencedColumnName: 'id'})
  survey: Survey;
}
