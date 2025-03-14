import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm';
import {Role} from "../../auth/role.enum";
import {SurveyResponse} from "../../surveys/entities/survey-response.entity";

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
    role: Role;

    @CreateDateColumn()
    created_at: Date;

//  @OneToMany(() => SurveyResponse, surveyResponse => surveyResponse.user, { cascade: true, orphanedRowAction: "delete" })
//  surveyResponse: SurveyResponse[];

  isAdmin(): boolean {
    return this.role == Role.Admin;
  }
}
