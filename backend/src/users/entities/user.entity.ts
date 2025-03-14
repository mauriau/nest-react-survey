import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import {Role} from "../../auth/role.enum";

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

    isAdmin(): boolean {
        return this.role == Role.Admin;
    }
}
