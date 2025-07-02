<script lang="ts">
  import type { DashboardStats } from '@repo/shared'
  import { ChartNoAxesCombined, Truck, ChartLine } from '@lucide/svelte'

  export let stats: DashboardStats | null
  export let loading: boolean

  $: cardData = stats
    ? [
        {
          title: 'Total Collected Today',
          value: `${stats.totalCollectedToday.value} KG`,
          change: stats.totalCollectedToday.change,
          comparison: stats.totalCollectedToday.subtext,
          icon: ChartNoAxesCombined,
          iconBgColor: 'bg-green-100',
          iconColor: 'text-green-600',
        },
        {
          title: 'Active Collections',
          value: stats.activeCollections.value,
          change: stats.activeCollections.change,
          comparison: stats.activeCollections.subtext,
          icon: Truck,
          iconBgColor: 'bg-indigo-100',
          iconColor: 'text-indigo-600',
        },
        {
          title: 'Producers Serviced',
          value: stats.producersServiced.value,
          change: stats.producersServiced.change,
          comparison: stats.producersServiced.subtext,
          icon: ChartLine,
          iconBgColor: 'bg-green-100',
          iconColor: 'text-green-600',
        },
        {
          title: 'Efficiency Rate',
          value: `${stats.efficiencyRate.value}%`,
          change: stats.efficiencyRate.change,
          comparison: stats.efficiencyRate.subtext,
          icon: ChartLine,
          iconBgColor: 'bg-green-100',
          iconColor: 'text-green-600',
        },
      ]
    : []
</script>

<div class="!grid !grid-cols-1 lg:!content-center md:!grid-cols-2 xl:!grid-cols-4 gap-4 mt-5">
  {#if loading}
    {#each Array(4) as _}
      <p>Card Loading....</p>
    {/each}
  {:else if stats}
    {#each cardData as card}
      <div class="col-span-1">
        <div class="p-4 rounded-[10px] !shadow-lg bg-white flex justify-between items-center gap-5">
          <div class="flex flex-col gap-3">
            <p class="text-fluid-xs font-normal">{card.title}</p>
            <h2 class="text-fluid-base font-semibold">{card.value}</h2>
            <p class="text-fluid-[14px] font-normal">
              {#if card.change !== undefined && card.change !== null}
                {@const isPositive = card.change >= 0}
                <span class={isPositive ? 'text-green-600' : 'text-red-600'}>
                  {Math.abs(card.change)}%
                </span>
              {/if}
              <span>&nbsp;{card.comparison}</span>
            </p>
          </div>
          <div class="p-3 rounded-full {card.iconBgColor}">
            <card.icon class="h-6 w-6 {card.iconColor}" />
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
