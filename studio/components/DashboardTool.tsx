import {Card, Text, Stack, Flex, Badge} from '@sanity/ui'
import {DashboardIcon} from '@sanity/icons'

export function DashboardTool() {
  return (
    <Card padding={4} margin={4} radius={2} shadow={1} tone="transparent">
      <Stack space={4}>
        <Flex align="center" gap={2}>
          <DashboardIcon />
          <Text weight="bold" size={2}>Project Control Center</Text>
        </Flex>
        
        <Card border padding={3} radius={2}>
          <Stack space={3}>
            <Text size={1} weight="semibold">Vercel Deployment Status</Text>
            <Badge tone="positive">Production Live</Badge>
            <Text size={1} muted>Domain: stenofreality.sanity.studio</Text>
          </Stack>
        </Card>

        <Card border padding={3} radius={2}>
          <Stack space={3}>
            <Text size={1} weight="semibold">Latest Archive Activity</Text>
            <Text size={1} muted>Tracking: Universal Filenames Enabled</Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}