import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id;

    @Index()
    @Column({ type: "varchar", length: "50", unique: true })
    username;

    @Column({ type: "varchar", length: 100, nullable: false })
    name;

    @Column({ type: "varchar", length: 100, nullable: false })
    password;

    @Column({ type: "datetime", nullable: true })
    last_login;

    @CreateDateColumn()
    created_at;

    @UpdateDateColumn()
    updated_at;
}