<script lang="ts">
  import { cn } from '../utils/cn'
  import { createTabs, melt } from '@melt-ui/svelte'
  import { History, ChartNoAxesCombined, MonitorUp, Clock } from '@lucide/svelte'
  import Dialog from './Dialog.svelte'
  import type { PropsTabs } from '../types/general'

  let { realtime, history, statistic, class: className }: PropsTabs = $props()

  const {
    elements: { root, list, content, trigger },
  } = createTabs({
    defaultValue: 'realtime',
  })

  const triggers = [
    { id: 'realtime', title: 'Realtime', icon: MonitorUp },
    { id: 'history', title: 'Collect History', icon: History },
    { id: 'statistic', title: 'Statistic', icon: ChartNoAxesCombined },
  ]
</script>

<div use:melt={$root} class={cn('flex flex-col rounded-xl bg-transparent', className)}>
  <div class="flex w-full flex-col lg:!flex-row gap-4 flex-row items-center justify-between">
    <div class="flex gap-2 items-center text-sm py-2 px-3 border border-gray-300 rounded-[7px]">
      <Clock class="h-4 w-4 text-gray-500" />
      <p class="text-gray-600 whitespace-nowrap">Monday, 14 April 2025 10:00:00</p>
    </div>

    <div
      use:melt={$list}
      class="flex flex-wrap justify-center gap-2 lg:gap-3 bg-neutral-100 text-[14px]"
      aria-label="Manage your account"
    >
      {#each triggers as triggerItem}
        <button
          use:melt={$trigger(triggerItem.id)}
          class="flex w-full md:!w-auto cursor-pointer justify-center items-center select-none border border-green-800 text-green-800 font-medium leading-10 text-[14px] md:text-base px-4 gap-2 rounded-[8px] focus:relative focus-visible:z-10 focus-visible:ring-2 relative active:bg-white active:text-green-800 data-[state=active]:focus:relative data-[state=active]:bg-green-100 data-[state=active]:text-green-800 data-[state=active]:border-transparent data-[state=active]:rounded-[8px]"
        >
          {triggerItem.title}
          <triggerItem.icon class="h-5 w-5" />
        </button>
      {/each}

      <Dialog />
    </div>
  </div>

  <div class="bg-transparent mt-6 rounded-[10px]">
    <div use:melt={$content('realtime')}>
      {@render realtime()}
    </div>

    <div use:melt={$content('history')}>
      {@render history()}
    </div>

    <div use:melt={$content('statistic')}>
      {@render statistic()}
    </div>
  </div>
</div>
