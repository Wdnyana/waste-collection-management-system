<script lang="ts" generics="T extends Record<string, any>">
  import Badge from './Badge.svelte'
  import Button from './Button.svelte'

  let {
    data = [],
    highlightColumns = {},
    hrefPrefix = undefined,
    idKey = '_id',
    hoveredId = null,
    onRowHover = (id: string | null) => {},
  } = $props<{
    data: T[]
    highlightColumns?: Record<string, string>
    hrefPrefix?: string
    idKey?: string
    hoveredId?: string | null
    onRowHover?: (id: string | null) => void
  }>()

  const headers = $derived(() => {
    if (data && data.length > 0) {
      return Object.keys(data[0]).filter((key) => key !== '_id') as (keyof T)[]
    } else {
      return []
    }
  })
</script>

{#if data.length > 0}
  <div class="w-full !h-full overflow-auto rounded-[10px] overflow-y-auto">
    <table class="w-full text-sm">
      <thead class="bg-green-100">
        <tr>
          {#each headers() as header}
            <th class="px-4 py-5 text-start font-medium text-[18px] uppercase">{String(header)}</th>
          {/each}
        </tr>
      </thead>

      <tbody>
        {#each data as row (row[idKey])}
          {#if hrefPrefix}
            <Button
              variant="link"
              size="md"
              href="{hrefPrefix}/{row[idKey]}"
              class="!no-underline contents"
            >
              <tr
                class="hover:bg-gray-100 hover:px-3 hover:!rounded-[8px] cursor-pointer !transition-colors"
                class:hover:!bg-gray-100={hoveredId === row[idKey]}
                on:mouseenter={() => onRowHover(row[idKey])}
                on:mouseleave={() => onRowHover(null)}
              >
                {#each headers() as headerKey}
                  <td
                    class="px-4 py-5 text-start font-normal text-[14px] {highlightColumns[
                      String(headerKey)
                    ] || ''} "
                  >
                    {#if String(headerKey).toLowerCase() === 'status'}
                      <Badge status={row[headerKey]} />
                    {:else}
                      {row[headerKey]}
                    {/if}
                  </td>
                {/each}
              </tr>
            </Button>
          {:else}
            <tr
              class="hover:bg-gray-100 transition-colors"
              class:hover:!bg-gray-100={hoveredId === row[idKey]}
              on:mouseenter={() => onRowHover(row[idKey])}
              on:mouseleave={() => onRowHover(null)}
            >
              {#each headers() as headerKey}
                <td
                  class="p-4 text-start font-normal text-[14px] {highlightColumns[
                    String(headerKey)
                  ] || ''}"
                >
                  {#if String(headerKey).toLowerCase() === 'status'}
                    <Badge status={row[headerKey]} />
                  {:else}
                    {row[headerKey]}
                  {/if}
                </td>
              {/each}
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <div class="mt-5 text-center text-gray-500">Tidak ada data untuk ditampilkan.</div>
{/if}
