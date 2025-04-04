import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Choice} from './choice.entity';
import {SurveyResponse} from './survey-response.entity';

@Entity()
export class Survey {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column()
    singleResponse: boolean;

    @OneToMany(() => Choice, (choice) => choice.survey, {cascade: true})
    choices: Choice[];

    @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.survey, {
        cascade: true,
        lazy: true,
    })
    surveyResponse: SurveyResponse[];
}
