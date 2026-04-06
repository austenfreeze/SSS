import { Card, Text, Stack, Flex, Badge, Button, Grid, Box } from '@sanity/ui'
import { 
  DashboardIcon, 
  UsersIcon, 
  ImagesIcon, 
  DocumentsIcon,
  LinkIcon,
  LaunchIcon,
  CogIcon
} from '@sanity/icons'

const FRONTEND_URL = process.env.SANITY_STUDIO_FRONTEND_URL || 'http://localhost:3000'

interface QuickLinkProps {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}

function QuickLink({ href, icon, title, description }: QuickLinkProps) {
  return (
    <Card 
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      padding={3} 
      radius={2} 
      border
      tone="default"
      style={{ textDecoration: 'none', cursor: 'pointer' }}
    >
      <Flex align="flex-start" gap={3}>
        <Box style={{ color: 'var(--card-fg-color)', opacity: 0.7 }}>
          {icon}
        </Box>
        <Stack space={2}>
          <Flex align="center" gap={2}>
            <Text size={1} weight="semibold">{title}</Text>
            <LaunchIcon style={{ opacity: 0.5 }} />
          </Flex>
          <Text size={1} muted>{description}</Text>
        </Stack>
      </Flex>
    </Card>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  tone?: 'positive' | 'caution' | 'critical' | 'primary'
}

function StatCard({ label, value, tone = 'primary' }: StatCardProps) {
  return (
    <Card padding={3} radius={2} border>
      <Stack space={2}>
        <Text size={1} muted>{label}</Text>
        <Badge tone={tone} fontSize={2} padding={2}>
          {value}
        </Badge>
      </Stack>
    </Card>
  )
}

export function DashboardTool() {
  return (
    <Card padding={4} margin={4} radius={2} shadow={1} tone="transparent">
      <Stack space={5}>
        {/* Header */}
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <DashboardIcon />
            <Text weight="bold" size={3}>Project Control Center</Text>
          </Flex>
          <Badge tone="positive" mode="outline">Studio Connected</Badge>
        </Flex>

        {/* Deployment Status */}
        <Card border padding={4} radius={2}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text size={1} weight="semibold">Deployment Status</Text>
              <Badge tone="positive">Production Live</Badge>
            </Flex>
            <Text size={1} muted>Domain: stenofreality.sanity.studio</Text>
            <Flex gap={2} wrap="wrap">
              <Badge tone="default" mode="outline">Vercel</Badge>
              <Badge tone="default" mode="outline">Next.js 16</Badge>
              <Badge tone="default" mode="outline">Sanity v3</Badge>
            </Flex>
          </Stack>
        </Card>

        {/* Quick Links to Frontend Admin */}
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <LinkIcon />
            <Text weight="semibold" size={2}>Frontend Admin Dashboard</Text>
          </Flex>
          
          <Grid columns={[1, 1, 2]} gap={3}>
            <QuickLink
              href={`${FRONTEND_URL}/dashboard`}
              icon={<DashboardIcon />}
              title="Dashboard Home"
              description="Overview and quick stats"
            />
            <QuickLink
              href={`${FRONTEND_URL}/dashboard/profiles`}
              icon={<UsersIcon />}
              title="Admin Profiles"
              description="Manage admin team members"
            />
            <QuickLink
              href={`${FRONTEND_URL}/dashboard/social`}
              icon={<LinkIcon />}
              title="Social Platforms"
              description="Manage social media integrations"
            />
            <QuickLink
              href={`${FRONTEND_URL}/dashboard/galleries`}
              icon={<ImagesIcon />}
              title="Galleries"
              description="Photo gallery management"
            />
          </Grid>
        </Stack>

        {/* Schema Quick Access */}
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <DocumentsIcon />
            <Text weight="semibold" size={2}>Content Shortcuts</Text>
          </Flex>
          
          <Grid columns={[2, 3, 4]} gap={2}>
            <Button
              as="a"
              href="/structure/admin"
              mode="ghost"
              tone="default"
              text="Admin"
              icon={UsersIcon}
            />
            <Button
              as="a"
              href="/structure/socialPortals"
              mode="ghost"
              tone="default"
              text="Social"
              icon={LinkIcon}
            />
            <Button
              as="a"
              href="/structure/media"
              mode="ghost"
              tone="default"
              text="Media"
              icon={ImagesIcon}
            />
            <Button
              as="a"
              href="/structure/editorial"
              mode="ghost"
              tone="default"
              text="Editorial"
              icon={DocumentsIcon}
            />
          </Grid>
        </Stack>

        {/* Platform Stats Overview */}
        <Stack space={3}>
          <Text weight="semibold" size={2}>Social Platform Status</Text>
          <Grid columns={[2, 3, 6]} gap={2}>
            <StatCard label="Spotify" value="Active" tone="positive" />
            <StatCard label="Instagram" value="Setup" tone="caution" />
            <StatCard label="YouTube" value="Setup" tone="caution" />
            <StatCard label="Twitter/X" value="Setup" tone="caution" />
            <StatCard label="TikTok" value="Setup" tone="caution" />
            <StatCard label="Facebook" value="Active" tone="positive" />
          </Grid>
        </Stack>

        {/* Archive Activity */}
        <Card border padding={3} radius={2}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text size={1} weight="semibold">Archive System</Text>
              <Badge tone="positive" mode="outline">Enabled</Badge>
            </Flex>
            <Text size={1} muted>Universal Filenames: Active</Text>
            <Text size={1} muted>Cross-platform sync ready</Text>
          </Stack>
        </Card>

        {/* Footer */}
        <Flex align="center" justify="space-between" paddingTop={3}>
          <Text size={0} muted>THE STEN OF REALITY v2.0</Text>
          <Flex gap={2}>
            <Button
              as="a"
              href={`${FRONTEND_URL}`}
              target="_blank"
              mode="ghost"
              tone="primary"
              text="View Site"
              icon={LaunchIcon}
              fontSize={1}
            />
            <Button
              as="a"
              href="/structure/settings"
              mode="ghost"
              tone="default"
              text="Settings"
              icon={CogIcon}
              fontSize={1}
            />
          </Flex>
        </Flex>
      </Stack>
    </Card>
  )
}
