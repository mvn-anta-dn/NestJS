import { IdeaEntity } from './../../ideas/entities/idea.entity';
import { UserEntity } from './../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  comment: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne((type) => UserEntity)
  @JoinTable()
  author: UserEntity;

  @ManyToOne((type) => IdeaEntity, (idea) => idea.comments)
  idea: IdeaEntity;
}
