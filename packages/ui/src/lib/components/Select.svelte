<script lang="ts">
  import { Check, ChevronDown } from '@lucide/svelte'
  import { createSelect, melt } from '@melt-ui/svelte'
  import { fade } from 'svelte/transition'

  const options = {
    AreaSelatanBarat: ['Denpasar', 'Badung', 'Tabanan', 'Jembrana'],
    AreaUtaraTimur: ['Karangasem', 'Bangli', 'Gianyar', 'Buleleng'],
  }

  const {
    elements: { trigger, menu, option, group, groupLabel },
    states: { selectedLabel, open },
    helpers: { isSelected },
  } = createSelect<string>({
    forceVisible: true,
    positioning: {
      placement: 'bottom',
      fitViewport: true,
      sameWidth: true,
    },
  })
</script>

<div class="flex flex-col gap-1 mb-1">
  <button
    class="flex h-10 w-full md:!min-w-[250px] cursor-pointer items-center justify-between rounded-[8px] bg-white px-3 py-4
  text-gray-300 border border-gray-300 transition-opacity hover:opacity-90"
    use:melt={$trigger}
    aria-label="Area"
  >
    {$selectedLabel || 'Select Area'}
    <ChevronDown class="size-5" />
  </button>
  {#if $open}
    <div
      class=" z-10 flex max-h-[300px] flex-col
    overflow-y-auto rounded-[10px] bg-white pt-5 pb-3
    shadow focus:!ring-0"
      use:melt={$menu}
      transition:fade={{ duration: 150 }}
    >
      {#each Object.entries(options) as [key, arr]}
        <div use:melt={$group(key)}>
          <div
            class="pb-1 pt-3 px-4 font-semibold capitalize text-gray-900 rounded-[10px]"
            use:melt={$groupLabel(key)}
          >
            {key}
          </div>
          {#each arr as item}
            <div
              class="relative cursor-pointer rounded-[10px] py-3 px-7 text-gray-900
              hover:bg-green-100 focus:z-10
              focus:text-green-800
              data-[highlighted]:bg-green-100 data-[highlighted]:mx-3 data-[highlighted]:text-green-800
              data-[disabled]:opacity-50"
              use:melt={$option({ value: item, label: item })}
            >
              <div
                class="absolute top-1/2 z-20 text-green-800 left-2 translate-y-[calc(-50%+1px)] {$isSelected(
                  item,
                )
                  ? 'block'
                  : 'hidden'}"
              >
                <Check class="size-4 me-2" />
              </div>

              {item}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>
