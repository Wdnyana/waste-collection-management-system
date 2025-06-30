<script lang="ts" generics="T extends Record<string, any>">
  let { data = [], highlightColumns = [] } = $props<{
    data: T[]
    highlightColumns?: string[]
  }>()

  const headers = $derived(() => {
    if (data && data.length > 0) {
      return Object.keys(data[0]) as (keyof T)[]
    } else {
      return []
    }
  })
</script>

{#if data.length > 0}
  <div class="w-full overflow-auto rounded-[8px] overflow-y-auto">
    <table class="w-full text-sm">
      <thead class="bg-green-100">
        <tr>
          {#each headers() as header}
            <th class="p-4 text-start font-medium text-[18px]">{String(header)}</th>
          {/each}
        </tr>
      </thead>

      <tbody>
        {#each data as row}
          <tr class="bg-gray-50 hover:bg-gray-100">
            {#each headers() as headerKey}
              <td
                class="p-4 text-start font-normal text-[14px]"
                class:text-green-800={highlightColumns.includes(String(headerKey))}
              >
                {row[headerKey]}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <div class="mt-5 text-center text-gray-500">Tidak ada data untuk ditampilkan.</div>
{/if}
