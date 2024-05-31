import { Entity, Column } from 'typeorm'

@Entity('votes')
export class Vote {
  @Column({ name: 'zid', type: 'integer', nullable: false })
  zid!: number

  @Column({ name: 'pid', type: 'integer', nullable: false })
  pid!: number

  @Column({ name: 'tid', type: 'integer', nullable: false })
  tid!: number

  @Column({ name: 'vote', type: 'smallint', nullable: true })
  vote!: number

  @Column({
    name: 'weight_x_32767',
    type: 'smallint',
    default: 0,
    nullable: true
  })
  weightX32767!: number

  @Column({
    name: 'created',
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  created!: number
}
