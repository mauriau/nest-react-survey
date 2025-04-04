import {User} from '../../users/entities/user.entity';
import {Survey} from './survey.entity';
import {
    ManyToOne,
    JoinColumn,
    Unique,
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['survey', 'user'])
export class SurveyResponse {
    @PrimaryColumn({type: 'varchar', name: 'user_id'})
    @ManyToOne(() => User, (user) => user.surveyResponses)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @PrimaryColumn({type: 'varchar', name: 'survey_id'})
    @ManyToOne(() => Survey, (survey) => survey.surveyResponse)
    @JoinColumn({name: 'survey_id', referencedColumnName: 'id'})
    survey: Survey;

    @CreateDateColumn()
    respondedAt: Date;

    @Column({type: 'json'})
    choices: string[];
}
