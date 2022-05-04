import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstText: string;

  @Column()
  firstPhoto: string;

  @Column()
  secondText: string;

  @Column()
  secondPhoto: string;
}

export interface IUpdatePost {
  id: number;
  firstText: string;
  firstPhoto: string;
  secondText?: string;
  secondPhoto?: string;
}
