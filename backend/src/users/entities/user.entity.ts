import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Unique} from 'typeorm';
import {Role} from "../../auth/role.enum";
import {SurveyResponse} from "../../surveys/entities/survey-response.entity";

@Unique(["username", "email"])
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User,
    })
    roles: Role[];

    @CreateDateColumn()
    created_at: Date;

  @OneToMany(() => SurveyResponse, surveyResponse => surveyResponse.user, { cascade: true, orphanedRowAction: "delete" })
  surveyResponses: SurveyResponse[];
}
