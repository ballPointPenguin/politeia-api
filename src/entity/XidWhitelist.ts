import { Entity, Column } from 'typeorm'

@Entity('xid_whitelist')
export class XidWhitelist {
  @Column({ name: 'owner', type: 'integer', nullable: false })
  owner: number

  @Column({ name: 'xid', type: 'text', nullable: false })
  xid: string

  @Column({
    name: 'created',
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  created: number
}
