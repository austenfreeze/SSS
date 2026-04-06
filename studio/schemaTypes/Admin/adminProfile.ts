import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'adminProfile',
  title: 'Admin Profile',
  type: 'document',
  icon: UserIcon,
  groups: [
    { name: 'identity', title: 'Identity' },
    { name: 'access', title: 'Access & Permissions' },
    { name: 'portals', title: 'Platform Portals' },
    { name: 'activity', title: 'Activity' },
  ],
  fields: [
    // --- Identity Group ---
    defineField({
      name: 'userHandle',
      title: 'System Alias',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      description: 'Used for authentication and notifications',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'idenity', // Preserved typo for database continuity
      title: 'Core Person Anchor',
      type: 'reference',
      to: [{ type: 'person' }],
      group: 'identity',
    }),
    defineField({
      name: 'identity', // Alias for the typo field - proper spelling
      title: 'Person Reference (Alias)',
      type: 'reference',
      to: [{ type: 'person' }],
      group: 'identity',
      hidden: true, // Hidden - use idenity for backward compatibility
    }),
    defineField({
      name: 'avatar',
      title: 'Admin Avatar',
      description: 'Override avatar (uses Person photo if not set)',
      type: 'reference',
      to: [{ type: 'photo' }],
      group: 'identity',
    }),
    defineField({
      name: 'bio',
      title: 'Admin Bio',
      type: 'text',
      rows: 3,
      group: 'identity',
    }),

    // --- Access & Permissions Group ---
    defineField({
      name: 'role',
      title: 'Admin Role',
      type: 'string',
      group: 'access',
      options: {
        list: [
          { title: 'Super Admin', value: 'superadmin' },
          { title: 'Editor', value: 'editor' },
          { title: 'Moderator', value: 'moderator' },
          { title: 'Contributor', value: 'contributor' },
          { title: 'Viewer', value: 'viewer' },
        ],
        layout: 'radio',
      },
      initialValue: 'editor',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permissions',
      title: 'Permissions',
      type: 'array',
      group: 'access',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Manage Users', value: 'manage_users' },
          { title: 'Manage Content', value: 'manage_content' },
          { title: 'Manage Media', value: 'manage_media' },
          { title: 'Manage Social Profiles', value: 'manage_social' },
          { title: 'Manage Galleries', value: 'manage_galleries' },
          { title: 'Publish Content', value: 'publish_content' },
          { title: 'Delete Content', value: 'delete_content' },
          { title: 'Access Analytics', value: 'access_analytics' },
          { title: 'Manage Settings', value: 'manage_settings' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Account Status',
      type: 'string',
      group: 'access',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
          { title: 'Suspended', value: 'suspended' },
          { title: 'Pending', value: 'pending' },
        ],
      },
      initialValue: 'active',
    }),

    // --- Platform Portals Group ---
    defineField({
      name: 'portals',
      title: 'Social Portals',
      description: 'Unified mapping of live URLs and deep archives.',
      type: 'array',
      group: 'portals',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'managedPlatforms',
      title: 'Managed Platform Profiles',
      description: 'Direct references to platform profiles this admin manages',
      type: 'array',
      group: 'portals',
      of: [
        { type: 'reference', to: [
          { type: 'spotifyProfile' },
          { type: 'facebookProfile' },
          { type: 'instagramProfile' },
          { type: 'youtubeProfile' },
          { type: 'twitterProfile' },
          { type: 'tiktokProfile' },
        ]},
      ],
    }),

    // --- Activity Group ---
    defineField({
      name: 'lastLogin',
      title: 'Last Login',
      type: 'datetime',
      group: 'activity',
      readOnly: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Account Created',
      type: 'datetime',
      group: 'activity',
      readOnly: true,
    }),
    defineField({
      name: 'activityLog',
      title: 'Recent Activity',
      type: 'array',
      group: 'activity',
      of: [{
        type: 'object',
        fields: [
          { name: 'action', title: 'Action', type: 'string' },
          { name: 'timestamp', title: 'Timestamp', type: 'datetime' },
          { name: 'details', title: 'Details', type: 'text' },
        ],
        preview: {
          select: {
            title: 'action',
            subtitle: 'timestamp',
          },
          prepare({ title, subtitle }) {
            return {
              title: title || 'Unknown Action',
              subtitle: subtitle ? new Date(subtitle).toLocaleString() : '',
            }
          },
        },
      }],
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'userHandle',
      email: 'email',
      role: 'role',
      status: 'status',
      personName: 'idenity.name',
      personImage: 'idenity.image',
      avatarImage: 'avatar.image',
    },
    prepare({ title, email, role, status, personName, personImage, avatarImage }) {
      const roleLabels: Record<string, string> = {
        superadmin: 'Super Admin',
        editor: 'Editor',
        moderator: 'Moderator',
        contributor: 'Contributor',
        viewer: 'Viewer',
      }
      const statusIndicator = status === 'active' ? '' : ` [${status?.toUpperCase()}]`
      return {
        title: title || 'Admin Profile',
        subtitle: `${roleLabels[role] || role} · ${personName || email || 'No identity linked'}${statusIndicator}`,
        media: avatarImage || personImage || UserIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Role',
      name: 'roleAsc',
      by: [{ field: 'role', direction: 'asc' }],
    },
    {
      title: 'Handle A-Z',
      name: 'handleAsc',
      by: [{ field: 'userHandle', direction: 'asc' }],
    },
    {
      title: 'Last Login',
      name: 'lastLoginDesc',
      by: [{ field: 'lastLogin', direction: 'desc' }],
    },
  ],
})
