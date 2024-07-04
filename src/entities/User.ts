import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
@Index('email_unique_check', ['email'], { unique: true })
@Index('users_uid_key', ['uid'], { unique: true })
@Index('site_domain_whitelist_idx', ['site_id'])
export class User {
  @PrimaryGeneratedColumn()
  uid!: number

  @Column({ type: 'varchar', length: 746, nullable: true })
  hname!: string

  @Column({ type: 'varchar', length: 128, nullable: true })
  pwhash!: string

  @Column({ type: 'varchar', length: 128, nullable: true })
  username!: string

  @Column({ type: 'varchar', length: 256, nullable: true })
  email!: string

  @Column({ name: 'is_owner', type: 'boolean', nullable: true, default: false })
  isOwner!: boolean

  @Column({ type: 'varchar', length: 300, nullable: true })
  zinvite!: string

  @Column({ type: 'varchar', length: 300, nullable: true })
  oinvite!: string

  @Column({ type: 'smallint', nullable: true, default: 0 })
  plan!: number

  @Column({ type: 'smallint', nullable: true, default: 0 })
  tut!: number

  @Column({
    name: 'site_id',
    type: 'varchar',
    length: 256,
    default: () => 'random_polis_site_id()'
  })
  siteId!: string

  @Column({
    name: 'site_owner',
    type: 'boolean',
    default: true
  })
  siteOwner!: boolean

  @Column({ type: 'boolean', default: false })
  test!: boolean

  @Column({
    type: 'bigint',
    nullable: true,
    default: () => 'now_as_millis()'
  })
  created!: number
}

/*
  *** COLUMN SCHEMA ***
  column_name,data_type,is_nullable,character_maximum_length,column_default
  uid,integer,NO,,nextval('users_uid_seq'::regclass)
  hname,character varying,YES,746,
  pwhash,character varying,YES,128,
  username,character varying,YES,128,
  email,character varying,YES,256,
  is_owner,boolean,YES,,false
  zinvite,character varying,YES,300,
  oinvite,character varying,YES,300,
  created,bigint,YES,,now_as_millis()
  plan,smallint,YES,,"0"
  tut,smallint,YES,,"0"
  site_id,character varying,NO,256,random_polis_site_id()
  site_owner,boolean,YES,,true
  test,boolean,YES,,false

  *** INDEXES ***
  index_name,index_definition
  email_unique_check,CREATE UNIQUE INDEX email_unique_check ON public.users USING btree (email)
  users_uid_key,CREATE UNIQUE INDEX users_uid_key ON public.users USING btree (uid)
  site_domain_whitelist_idx,CREATE INDEX site_domain_whitelist_idx ON public.users USING btree (site_id)

  *** FOREIGN KEYS ***
  none
*/
