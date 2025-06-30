<script lang="ts">
  import { cn } from '../utils/cn'
  import { createTabs, melt } from '@melt-ui/svelte'
  import {
    History,
    ChartNoAxesCombined,
    MonitorUp,
    Clock,
    ChartLine,
    Wifi,
    WifiOff,
    Settings,
    RefreshCcw,
    CirclePlay,
  } from '@lucide/svelte'
  import Dialog from './Dialog.svelte'
  import type { PropsStatusIndicator } from '../types/general'
  import Select from './Select.svelte'

  let { settings, monitoring, reset, class: className }: PropsStatusIndicator = $props()

  const {
    elements: { root, list, content, trigger },
  } = createTabs({
    defaultValue: 'settings',
  })

  const triggers = [
    { id: 'settings', title: 'Settings', icon: Settings },
    { id: 'monitoring', title: 'Start Monitoring', icon: CirclePlay },
    { id: 'reset', title: 'Reset Data', icon: RefreshCcw },
  ]
</script>

<div use:melt={$root} class={cn('flex flex-col rounded-[10px] bg-transparent', className)}>
  <div class="rounded-[10px] shadow-lg bg-white py-3 px-4">
    <div class="flex w-full flex-col xl:!flex-row gap-4 flex-row items-center justify-between">
      <div
        class="flex flex-col md:!flex-row py-4 gap-3 md:gap-7 xl:!gap-3 items-center justify-start text-sm w-auto"
      >
        <div class="flex justify-start items-center gap-3">
          <ChartLine class="h-5 w-5" />
          <h2 class="text-start pb-1 text-fluid-base text-gray-900">Real-time Monitoring</h2>
        </div>

        <div class="flex justify-start items-center gap-3">
          <WifiOff class="h-5 w-5" />
          <!-- <Wifi class="h-5 w-5" /> -->
          <p class="text-gray-600 whitespace-nowrap">Disconnected</p>
        </div>

        <div class="flex justify-start items-center gap-3">
          <p class="text-gray-600 whitespace-nowrap">Last Update: 11:00:00</p>
        </div>
      </div>

      <div
        use:melt={$list}
        class="flex flex-wrap justify-center gap-3 lg:gap-3 py-4 bg-white text-[14px]"
        aria-label="Manage your account"
      >
        {#each triggers as triggerItem}
          <button
            use:melt={$trigger(triggerItem.id)}
            class="flex w-full md:!w-auto cursor-pointer justify-center items-center select-none border border-green-800 text-green-800 font-medium leading-10 text-[14px] md:text-base px-4 gap-2 rounded-[8px] focus:relative focus-visible:z-10 focus-visible:ring-2 relative active:bg-white active:text-green-800 data-[state=active]:focus:relative data-[state=active]:bg-green-100 data-[state=active]:text-green-800 data-[state=active]:border-transparent data-[state=active]:rounded-[8px]"
          >
            <triggerItem.icon class="h-5 w-5" />
            {triggerItem.title}
          </button>
        {/each}
      </div>
    </div>

    <div
      class="flex flex-col justify-center mt-10 lg:!flex-row lg:!justify-between lg:!items-center"
    >
      <Select />
      <div class="flex flex-col justify-center md:!items-center md:!flex-row gap-3 lg:gap-4">
        <p class="text-gray-300 whitespace-nowrap font-normal">
          Total Scheduled:&ensp;
          <span class="text-[20px] font-semibold text-gray-900">10</span>
        </p>

        <p class="text-gray-300 whitespace-nowrap font-normal">
          Total Done:&ensp;
          <span class="text-[20px] font-semibold text-green-500">4</span>
        </p>
      </div>
    </div>
  </div>

  <div class="mt-6 rounded-[10px] bg-white !shadow-lg">
    <div use:melt={$content('settings')}>
      {@render settings()}
    </div>

    <div use:melt={$content('monitoring')}>
      {@render monitoring()}
    </div>

    <div use:melt={$content('reset')}>
      {@render reset()}
    </div>
  </div>
</div>
