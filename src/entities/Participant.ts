import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Conversation } from './Conversation'
import { User } from './User'

@Entity('participants')
@Index('participants_zid_pid_key', ['zid', 'pid'], { unique: true })
@Index('participants_zid_uid_key', ['zid', 'uid'], { unique: true })
@Index('participants_conv_idx', ['zid'])
@Index('participants_conv_uid_idx', ['uid'])
@Index('participants_uid_index', ['uid'])
export class Participant {
  @PrimaryGeneratedColumn()
  pid!: number

  @Column()
  uid!: number

  @Column()
  zid!: number

  @Column({ name: 'vote_count', type: 'integer', default: 0 })
  voteCount!: number

  @Column({ name: 'last_interaction', type: 'bigint', default: 0 })
  lastInteraction!: number

  @Column({ type: 'integer', default: 0 })
  subscribed!: number

  @Column({ name: 'last_notified', type: 'bigint', default: 0, nullable: true })
  lastNotified!: number

  @Column({ type: 'integer', default: 0 })
  mod!: number

  @Column({ type: 'smallint', default: 0 })
  nsli!: number

  @Column({ type: 'bigint', default: () => 'now_as_millis()', nullable: true })
  created!: number

  @ManyToOne(() => Conversation)
  @JoinColumn({ name: 'zid' })
  conversation!: Conversation

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uid' })
  user!: User
}

/*
  *** COLUMN SCHEMA ***
  column_name, data_type, is_nullable, column_default
  pid, integer, NO,
  uid, integer, NO,
  zid, integer, NO,
  created, bigint, YES, now_as_millis()
  vote_count, integer, NO, "0"
  last_interaction, bigint, NO, "0"
  subscribed, integer, NO, "0"
  last_notified, bigint, YES, "0"
  mod, integer, NO, "0"
  nsli, smallint, NO, "0"

  *** INDEXES ***
  index_name,index_definition
  participants_zid_pid_key,"CREATE UNIQUE INDEX participants_zid_pid_key ON public.participants USING btree (zid, pid)"
  participants_zid_uid_key,"CREATE UNIQUE INDEX participants_zid_uid_key ON public.participants USING btree (zid, uid)"
  participants_conv_idx,CREATE INDEX participants_conv_idx ON public.participants USING btree (zid)
  participants_conv_uid_idx,CREATE INDEX participants_conv_uid_idx ON public.participants USING btree (uid)
  participants_uid_index,CREATE INDEX participants_uid_index ON public.participants USING btree (uid)

  *** FOREIGN KEYS ***
  constraint_name,column_name,foreign_table_name,foreign_column_name
  participants_zid_fkey,zid,conversations,zid
  participants_uid_fkey,uid,users,uid
*/
