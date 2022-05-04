import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
/*
{
  "login": "volirim",
  "name": "Den",
  "email": "sstrifassng@mail.com"
}
*/

@Entity('users')
export class User {
  @PrimaryColumn('varchar', { length: 20 })
  login: string;

  @Column('text', {})
  password: string;

  @Column('varchar', { length: 20 })
  name: string;
  
  @Column('varchar', { unique: true, length: 40 })
  email: string;
}

export interface IUserDTO {
  login: string;
  name: string;
  email: string;
}

export interface IUpdateUser {
  login: string;
  email: string;
  name?: string;
  password?: string;
}
