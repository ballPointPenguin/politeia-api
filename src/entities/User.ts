import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'uid' })
  uid!: number

  @Column({ name: 'hname', type: 'varchar', length: 746, nullable: true })
  hname!: string

  @Column({
    name: 'created',
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  created!: number

  @Column({ name: 'username', type: 'varchar', length: 128, nullable: true })
  username!: string

  @Column({ name: 'email', type: 'varchar', length: 256, nullable: true })
  email!: string

  @Column({ name: 'is_owner', type: 'boolean', default: false, nullable: true })
  isOwner!: boolean

  @Column({ name: 'zinvite', type: 'varchar', length: 300, nullable: true })
  zinvite!: string

  @Column({ name: 'oinvite', type: 'varchar', length: 300, nullable: true })
  oinvite!: string

  @Column({ name: 'tut', type: 'smallint', default: 0, nullable: true })
  tut!: number

  @Column({
    name: 'site_id',
    type: 'varchar',
    length: 256,
    default: () => 'random_polis_site_id()',
    nullable: false
  })
  siteId!: string

  @Column({
    name: 'site_owner',
    type: 'boolean',
    default: true,
    nullable: false
  })
  siteOwner!: boolean
}
