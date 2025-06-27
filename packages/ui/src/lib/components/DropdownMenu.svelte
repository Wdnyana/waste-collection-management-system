<script lang="ts">
  import { createDropdownMenu, melt } from '@melt-ui/svelte'

  import DropdownItem from './DropdownItem.svelte'
  import Avatar from './Avatar.svelte'

  import { Enter } from 'radix-icons-svelte'
  import { fly } from 'svelte/transition'

  const {
    elements: { trigger, menu, item, separator },
    states: { open },
  } = createDropdownMenu({
    // forceVisible: true,
    loop: true,
  })

  const firstMenuItem = [
    { href: '#viewprofile', title: 'ViewProfile' },
    { href: '#settings', title: 'Settings' },
  ]

  const secondMenuItem = [
    { href: '#history', title: 'History' },
    { href: '#support', title: 'Support' },
  ]
</script>

<button
  type="button"
  class="flex w-full cursor-pointer h-9 md:h-10 lg:h-12 items-center justify-center rounded-full bg-white p-0 text-sm font-medium text-magnum-900 transition-colors hover:bg-white/90 data-[highlighted]:outline-none data-[highlighted]:ring-2 data-[highlighted]:ring-magnum-400 data-[highlighted]:ring-offset-2"
  use:melt={$trigger}
  aria-label="Update dimensions"
>
  <div class="flex items-start justify-start lg:items-center lgjustify-between gap-4">
    <Avatar />

    <div>
      <h4 class="text-start pb-1 text-fluid-sm">Nama Pengguna</h4>
      <p class="text-start text-xs text-magnum-400 text-muted">Administrator</p>
    </div>
  </div>

  <span class="sr-only">Open Popover</span>
</button>

{#if $open}
  <div
    class="z-40 flex max-h-[300px] min-w-[220px] flex-col rounded-xl bg-white p-2 shadow-lg shadow-neutral-900/30 lg:max-h-none"
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -10 }}
  >
    {#each firstMenuItem as items}
      <DropdownItem href={items.href} melt={$item}>{items.title}</DropdownItem>
    {/each}

    <div class="m-[5px] h-px bg-magnum-200" use:melt={$separator}></div>

    {#each secondMenuItem as items}
      <DropdownItem href={items.href} melt={$item}>{items.title}</DropdownItem>
    {/each}

    <div class="m-[5px] h-px bg-magnum-200" use:melt={$separator}></div>

    <a href="#logout">
      <div
        class="relative flex justify-between h-6 min-h-[24px] select-none items-center rounded-[5px] py-4 px-3 text-sm leading-none text-red-500 data-[highlighted]:text-neutral-300 outline-none data-[disabled]:text-neutral-300 data-[highlighted]:bg-red-500"
        use:melt={$item}
      >
        Logout
        <Enter class="right-2 w-6 h-5" />
      </div>
    </a>
  </div>
{/if}
