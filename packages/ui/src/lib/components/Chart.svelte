<script lang="ts">
  import { categories, bgCharts } from '../utils/card-stat'
  import type { ChartData } from 'chart.js'

  export let title: string
  export let subtitle: string
  export let loading: boolean = true
  export let error: string | null = null
  export let chartData: ChartData | null = null

  $: legendItems =
    chartData?.datasets.map((dataset: any) => ({
      label: dataset.label,

      bgColor: dataset.borderColor || '#ccc',
    })) || []
</script>

<div class="grid gap-5 grid-cols-1 lg:grid-cols-2 mt-5">
  <div class="bg-white px-4 py-7 xl:!p-10 rounded-[10px] !shadow-lg h-full flex flex-col">
    <div>
      <h1 class="text-fluid-lg font-semibold mb-2">{title}</h1>
      <p class="text-[14px] font-normal text-gray-500">{subtitle}</p>
    </div>

    <div class="my-10 flex-grow relative min-h-[250px]">
      {#if loading}
        <div class="flex items-center justify-center h-full text-gray-500">
          Memuat data grafik...
        </div>
      {:else if error}
        <div class="flex items-center justify-center h-full text-red-500 text-center">{error}</div>
      {:else if chartData}
        <slot />
      {/if}
    </div>

    <div class="flex gap-5 justify-center flex-wrap">
      {#each legendItems as item}
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full" style="background-color: {item.bgColor};"></span>
          <p class="text-sm text-gray-600">{item.label}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="bg-white px-4 py-7 xl:!p-10 rounded-[10px] !shadow-lg">
    <div class="">
      <h1 class="text-fluid-lg font-semibold mb-2">Waste Type Distribution</h1>
      <p class="text-[14px] font-normal">Breakdown by waste categories</p>
    </div>

    <div class="flex justify-center my-16">
      <span class="h-[350px] w-[350px] rounded-full bg-blue-800"></span>
    </div>

    <div class="flex gap-5 justify-evenly">
      {#each categories as category}
        <div class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-full {category.colorClass}"></span>

          <p class="text-sm text-gray-600">{category.label}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
