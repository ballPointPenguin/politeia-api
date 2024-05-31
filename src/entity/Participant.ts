import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Participant {
  @PrimaryGeneratedColumn({ name: 'pid' })
  pid: number

  @Column({ name: 'uid', type: 'integer', nullable: false })
  uid: number

  @Column({ name: 'zid', type: 'integer', nullable: false })
  zid: number

  @Column({ name: 'vote_count', type: 'integer', default: 0, nullable: false })
  voteCount: number

  @Column({
    name: 'last_interaction',
    type: 'bigint',
    default: 0,
    nullable: false
  })
  lastInteraction: number

  @Column({ name: 'subscribed', type: 'integer', default: 0, nullable: false })
  subscribed: number

  @Column({ name: 'last_notified', type: 'bigint', default: 0, nullable: true })
  lastNotified: number

  @Column({ name: 'nsli', type: 'smallint', default: 0, nullable: false })
  nsli: number

  @Column({ name: 'mod', type: 'integer', default: 0, nullable: false })
  mod: number

  @Column({
    name: 'created',
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  created: number
}
