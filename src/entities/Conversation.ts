import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
// import { Course } from './Course'
import { User } from './User'

@Entity('conversations')
@Index('conversations_owner_idx', ['owner'])
@Index('conversations_zid_index', ['zid'], { unique: true })
@Index('conversations_zid_key', ['zid'], { unique: true })
export class Conversation {
  @PrimaryGeneratedColumn()
  zid!: number

  @Column({ type: 'varchar', length: 1000, nullable: true })
  topic!: string

  @Column({
    type: 'varchar',
    length: 50000,
    nullable: true
  })
  description!: string

  @Column({ name: 'is_anon', type: 'boolean', default: true, nullable: true })
  isAnon!: boolean

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: false,
    nullable: true
  })
  isActive!: boolean

  @Column({ name: 'is_draft', type: 'boolean', default: false, nullable: true })
  isDraft!: boolean

  @Column({ name: 'is_public', type: 'boolean', default: true, nullable: true })
  isPublic!: boolean

  @Column({
    name: 'email_domain',
    type: 'varchar',
    length: 200,
    nullable: true
  })
  emailDomain!: string

  @Column({ type: 'integer', nullable: true })
  owner!: number

  @Column({
    name: 'participant_count',
    type: 'integer',
    default: 0,
    nullable: true
  })
  participantCount!: number

  @Column({
    name: 'strict_moderation',
    type: 'boolean',
    default: false,
    nullable: true
  })
  strictModeration!: boolean

  @Column({
    name: 'profanity_filter',
    type: 'boolean',
    default: true,
    nullable: true
  })
  profanityFilter!: boolean

  @Column({
    name: 'spam_filter',
    type: 'boolean',
    default: true,
    nullable: true
  })
  spamFilter!: boolean

  @Column({ type: 'varchar', length: 1000, nullable: true })
  context!: string

  @Column({
    name: 'owner_sees_participation_stats',
    type: 'boolean',
    default: false,
    nullable: true
  })
  ownerSeesParticipationStats!: boolean

  @Column({ name: 'course_id', type: 'integer', nullable: true })
  courseId!: number

  @Column({
    name: 'lti_users_only',
    type: 'boolean',
    nullable: true,
    default: false
  })
  ltiUsersOnly!: boolean

  @Column({ name: 'link_url', type: 'varchar', length: 9999, nullable: true })
  linkUrl!: string

  @Column({ type: 'integer', default: 1 })
  upvotes!: number

  @Column({ name: 'parent_url', type: 'varchar', length: 9999, nullable: true })
  parentUrl!: string

  @Column({ name: 'vis_type', type: 'integer', default: 0 })
  visType!: number

  @Column({ name: 'write_type', type: 'integer', default: 1 })
  writeType!: number

  @Column({ type: 'varchar', length: 20, nullable: true })
  bgcolor!: string

  @Column({ name: 'help_type', type: 'integer', default: 1 })
  helpType!: number

  @Column({
    name: 'socialbtn_type',
    type: 'integer',
    default: 0
  })
  socialbtnType!: number

  @Column({ name: 'style_btn', type: 'varchar', length: 500, nullable: true })
  styleBtn!: string

  @Column({
    name: 'auth_needed_to_vote',
    type: 'boolean',
    nullable: true,
    default: false
  })
  authNeededToVote!: boolean

  @Column({
    name: 'auth_needed_to_write',
    type: 'boolean',
    nullable: true,
    default: true
  })
  authNeededToWrite!: boolean

  @Column({
    name: 'auth_opt_fb',
    type: 'boolean',
    nullable: true,
    default: true
  })
  authOptFb!: boolean

  @Column({
    name: 'auth_opt_tw',
    type: 'boolean',
    nullable: true,
    default: true
  })
  authOptTw!: boolean

  @Column({
    name: 'auth_opt_allow_3rdparty',
    type: 'boolean',
    nullable: true,
    default: true
  })
  authOptAllow3rdparty!: boolean

  @Column({ name: 'help_bgcolor', type: 'varchar', length: 20, nullable: true })
  helpBgcolor!: string

  @Column({ name: 'help_color', type: 'varchar', length: 20, nullable: true })
  helpColor!: string

  @Column({
    name: 'is_data_open',
    type: 'boolean',
    default: false,
    nullable: true
  })
  isDataOpen!: boolean

  @Column({
    name: 'is_slack',
    type: 'boolean',
    default: false,
    nullable: true
  })
  isSlack!: boolean

  @Column({
    name: 'is_curated',
    type: 'boolean',
    default: false,
    nullable: true
  })
  isCurated!: boolean

  @Column({
    name: 'dataset_explanation',
    type: 'varchar',
    length: 50000,
    nullable: true
  })
  datasetExplanation!: string

  @Column({
    name: 'write_hint_type',
    type: 'integer',
    default: 1
  })
  writeHintType!: number

  @Column({
    name: 'subscribe_type',
    type: 'integer',
    default: 1
  })
  subscribeType!: number

  @Column({ name: 'org_id', type: 'integer', nullable: true })
  orgId!: number

  @Column({
    name: 'need_suzinvite',
    type: 'boolean',
    default: false,
    nullable: true
  })
  needSuzinvite!: boolean

  @Column({
    name: 'use_xid_whitelist',
    type: 'boolean',
    default: false,
    nullable: true
  })
  useXidWhitelist!: boolean

  @Column({
    name: 'prioritize_seed',
    type: 'boolean',
    default: false,
    nullable: true
  })
  prioritizeSeed!: boolean

  @Column({
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  created!: number

  @Column({
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  modified!: number

  // @ManyToOne(() => Course)
  // @JoinColumn({ name: 'course_id' })
  // course!: Course

  @ManyToOne(() => User)
  @JoinColumn({ name: 'org_id' })
  orgUser!: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner' })
  ownerUser!: User
}

/*
 *** COLUMN SCHEMA ***
  column_name,data_type,is_nullable,character_maximum_length,column_default
  zid,integer,NO,,nextval('conversations_zid_seq'::regclass)
  topic,character varying,YES,1000,
  description,character varying,YES,50000,
  is_anon,boolean,YES,,true
  is_active,boolean,YES,,false
  is_draft,boolean,YES,,false
  is_public,boolean,YES,,true
  email_domain,character varying,YES,200,
  owner,integer,YES,,
  participant_count,integer,YES,,"0"
  created,bigint,YES,,now_as_millis()
  strict_moderation,boolean,YES,,false
  profanity_filter,boolean,YES,,true
  spam_filter,boolean,YES,,true
  context,character varying,YES,1000,
  modified,bigint,YES,,now_as_millis()
  owner_sees_participation_stats,boolean,YES,,false
  course_id,integer,YES,,
  lti_users_only,boolean,YES,,false
  link_url,character varying,YES,9999,
  upvotes,integer,NO,,1
  parent_url,character varying,YES,9999,
  vis_type,integer,NO,,"0"
  write_type,integer,NO,,1
  bgcolor,character varying,YES,20,
  help_type,integer,NO,,1
  socialbtn_type,integer,NO,,"0"
  style_btn,character varying,YES,500,
  auth_needed_to_vote,boolean,YES,,false
  auth_needed_to_write,boolean,YES,,true
  auth_opt_fb,boolean,YES,,true
  auth_opt_tw,boolean,YES,,true
  auth_opt_allow_3rdparty,boolean,YES,,true
  help_bgcolor,character varying,YES,20,
  help_color,character varying,YES,20,
  is_data_open,boolean,YES,,false
  is_slack,boolean,YES,,false
  is_curated,boolean,YES,,false
  dataset_explanation,character varying,YES,50000,
  write_hint_type,integer,NO,,1
  subscribe_type,integer,NO,,1
  org_id,integer,YES,,
  need_suzinvite,boolean,YES,,false
  use_xid_whitelist,boolean,YES,,false
  prioritize_seed,boolean,YES,,false

  *** INDEXES ***
  index_name,index_definition
  conversations_zid_key,CREATE UNIQUE INDEX conversations_zid_key ON public.conversations USING btree (zid)
  conversations_owner_idx,CREATE INDEX conversations_owner_idx ON public.conversations USING btree (owner)
  conversations_zid_index,CREATE UNIQUE INDEX conversations_zid_index ON public.conversations USING btree (zid)

  *** FOREIGN KEYS ***
  constraint_name,column_name,foreign_table_name,foreign_column_name
  conversations_owner_fkey,owner,users,uid
  conversations_course_id_fkey,course_id,courses,course_id
  conversations_actual_ownr_fkey,org_id,users,uid
*/
