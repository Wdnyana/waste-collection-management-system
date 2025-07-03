<script lang="ts">
  import Button from './Button.svelte'
  import Select from './Select.svelte'

  import { Download } from '@lucide/svelte'

  const monthOptions = {
    Month: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September'],
  }

  let selectedMonth: string | undefined
</script>

<div
  class="flex flex-col justify-center items-center gap-4 lg:!flex-row lg:!items-center lg:!justify-between py-4 px-5 bg-white !shadow-lg rounded-[10px]"
>
  <p class="text-gray-900 w-full text-center lg:text-start">Statistic this month</p>
  <div
    class="flex gap-4 justify-center md:items-center lg:!justify-end lg:!items-center flex-col md:!flex-row w-full"
  >
    <Select options={monthOptions} placeholder="This Month" bind:value={selectedMonth} />

    <Button
      variant="outline"
      class="bg-white rounded-[8px] border border-gray-300 text-gray-400 hover:bg-transparent cursor-pointer"
      >Refresh Date</Button
    >
    <Button
      variant="outline"
      class="bg-white rounded-[8px] border border-gray-300 text-gray-400 hover:bg-transparent cursor-pointer"
      >Export <Download class="ms-3 h-4 w-4" /></Button
    >
  </div>
</div>
