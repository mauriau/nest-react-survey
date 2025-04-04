import {
    Column,
    Entity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import {Survey} from './survey.entity';

@Entity()
export class Choice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => Survey, (survey) => survey.choices)
    @JoinColumn({name: 'survey_id', referencedColumnName: 'id'})
    survey: Survey;
}
