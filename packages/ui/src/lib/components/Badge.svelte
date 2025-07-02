<script lang="ts">
  export let status:
    | 'todo'
    | 'next'
    | 'done'
    | 'anomaly'
    | 'active'
    | 'idle'
    | 'maintenance'
    | string

  $: badgeInfo = (() => {
    switch (status) {
      case 'todo':
        return { text: 'To Do', color: 'text-indicator-todo' }
      case 'next':
        return { text: 'Next', color: 'text-indicator-next' }
      case 'done':
        return { text: 'Done', color: 'text-indicator-done' }
      case 'anomaly':
        return { text: 'Anomaly', color: 'text-indicator-anomaly' }
      case 'active':
        return { text: 'Active', color: 'text-emerald-500' }
      case 'idle':
        return { text: 'Idle', color: 'text-yellow-500' }
      case 'maintenance':
        return { text: 'Maintenance', color: 'text-orange-500' }
      default:
        return { text: status, color: 'text-gray-300 text-black' }
    }
  })()
</script>

<span class="px-3 py-1 text-fluid-xs font-medium rounded-full whitespace-nowrap {badgeInfo.color}">
  {badgeInfo.text}
</span>
