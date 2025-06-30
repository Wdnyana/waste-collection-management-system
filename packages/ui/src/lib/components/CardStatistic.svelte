<script lang="ts">
  import { statCards } from '../utils/card-stat'
</script>

<div class="!grid !grid-cols-1 lg:!content-center md:!grid-cols-2 xl:!grid-cols-4 gap-4 mt-5">
  {#each statCards as card}
    <div class="col-span-1">
      <div class="p-4 rounded-[10px] !shadow-lg bg-white flex justify-between items-center gap-5">
        <div class="flex flex-col gap-3">
          <p class="text-fluid-xs font-normal">{card.title}</p>
          <h2 class="text-fluid-base font-semibold">{card.value}</h2>
          <p class="text-fluid-[14px] font-normal">
            <span class={card.percentageColor}>{card.percentage}&ensp;</span>{card.comparison}
          </p>
        </div>
        <div class="p-3 rounded-full {card.iconBgColor}">
          <card.icon class="h-6 w-6 {card.iconColor}" />
        </div>
      </div>
    </div>
  {/each}
</div>
