import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn({ name: 'zid' })
  zid!: number

  @Column({ name: 'topic', type: 'varchar', length: 1000, nullable: true })
  topic!: string

  @Column({
    name: 'description',
    type: 'varchar',
    length: 50000,
    nullable: true
  })
  description!: string

  @Column({ name: 'link_url', type: 'varchar', length: 9999, nullable: true })
  linkUrl!: string

  @Column({ name: 'parent_url', type: 'varchar', length: 9999, nullable: true })
  parentUrl!: string

  @Column({ name: 'upvotes', type: 'integer', default: 1, nullable: false })
  upvotes!: number

  @Column({
    name: 'participant_count',
    type: 'integer',
    default: 0,
    nullable: true
  })
  participantCount!: number

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
    name: 'is_data_open',
    type: 'boolean',
    default: false,
    nullable: true
  })
  isDataOpen!: boolean

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

  @Column({
    name: 'strict_moderation',
    type: 'boolean',
    default: false,
    nullable: true
  })
  strictModeration!: boolean

  @Column({
    name: 'prioritize_seed',
    type: 'boolean',
    default: false,
    nullable: true
  })
  prioritizeSeed!: boolean

  @Column({ name: 'vis_type', type: 'integer', default: 0, nullable: false })
  visType!: number

  @Column({ name: 'write_type', type: 'integer', default: 1, nullable: false })
  writeType!: number

  @Column({ name: 'help_type', type: 'integer', default: 1, nullable: false })
  helpType!: number

  @Column({
    name: 'write_hint_type',
    type: 'integer',
    default: 1,
    nullable: false
  })
  writeHintType!: number

  @Column({ name: 'style_btn', type: 'varchar', length: 500, nullable: true })
  styleBtn!: string

  @Column({
    name: 'socialbtn_type',
    type: 'integer',
    default: 0,
    nullable: false
  })
  socialbtnType!: number

  @Column({
    name: 'subscribe_type',
    type: 'integer',
    default: 1,
    nullable: false
  })
  subscribeType!: number

  @Column({
    name: 'branding_type',
    type: 'integer',
    default: 1,
    nullable: false
  })
  brandingType!: number

  @Column({ name: 'bgcolor', type: 'varchar', length: 20, nullable: true })
  bgcolor!: string

  @Column({ name: 'help_bgcolor', type: 'varchar', length: 20, nullable: true })
  helpBgcolor!: string

  @Column({ name: 'help_color', type: 'varchar', length: 20, nullable: true })
  helpColor!: string

  @Column({
    name: 'email_domain',
    type: 'varchar',
    length: 200,
    nullable: true
  })
  emailDomain!: string

  @Column({
    name: 'use_xid_whitelist',
    type: 'boolean',
    default: false,
    nullable: true
  })
  useXidWhitelist!: boolean

  @Column({ name: 'owner', type: 'integer', nullable: true })
  owner!: number

  @Column({ name: 'org_id', type: 'integer', nullable: true })
  orgId!: number

  @Column({ name: 'context', type: 'varchar', length: 1000, nullable: true })
  context!: string

  @Column({ name: 'course_id', type: 'integer', nullable: true })
  courseId!: number

  @Column({
    name: 'owner_sees_participation_stats',
    type: 'boolean',
    default: false,
    nullable: true
  })
  ownerSeesParticipationStats!: boolean

  @Column({ name: 'auth_needed_to_vote', type: 'boolean', nullable: true })
  authNeededToVote!: boolean

  @Column({ name: 'auth_needed_to_write', type: 'boolean', nullable: true })
  authNeededToWrite!: boolean

  @Column({ name: 'auth_opt_fb', type: 'boolean', nullable: true })
  authOptFb!: boolean

  @Column({ name: 'auth_opt_tw', type: 'boolean', nullable: true })
  authOptTw!: boolean

  @Column({ name: 'auth_opt_allow_3rdparty', type: 'boolean', nullable: true })
  authOptAllow3rdparty!: boolean

  @Column({
    name: 'modified',
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  modified!: number

  @Column({
    name: 'created',
    type: 'bigint',
    default: () => 'now_as_millis()',
    nullable: true
  })
  created!: number
}
