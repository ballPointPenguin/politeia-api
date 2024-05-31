import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('participants_extended') // This explicitly sets the table name
export class ParticipantsExtended {
  @PrimaryGeneratedColumn({ name: 'uid' })
  uid: number

  @Column({ name: 'zid', type: 'integer', nullable: false })
  zid: number

  @Column({ name: 'referrer', type: 'varchar', length: 9999, nullable: true })
  referrer: string

  @Column({ name: 'parent_url', type: 'varchar', length: 9999, nullable: true })
  parentUrl: string

  @Column({
    name: 'created',
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  created: number

  @Column({
    name: 'modified',
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: false
  })
  modified: number

  @Column({
    name: 'subscribe_email',
    type: 'varchar',
    length: 256,
    nullable: true
  })
  subscribeEmail: string

  @Column({
    name: 'show_translation_activated',
    type: 'boolean',
    nullable: true
  })
  showTranslationActivated: boolean

  @Column({
    name: 'permanent_cookie',
    type: 'varchar',
    length: 32,
    nullable: true
  })
  permanentCookie: string

  @Column({ name: 'origin', type: 'varchar', length: 9999, nullable: true })
  origin: string
}
