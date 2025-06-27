<script lang="ts">
  import { menuGroups } from './../utils/sidebar-item'

  import { createDropdownMenu, melt } from '@melt-ui/svelte'

  const {
    elements: { item, separator },
  } = createDropdownMenu({
    loop: true,
  })

  let activeItem = $state('#dashboard')
</script>

<ul>
  {#each menuGroups as group, groupIndex}
    <div class="mb-5">
      <p class="uppercase ps-4 text-fluid-xs leading-wider lg:text-base lg:ps-6 mb-3 text-gray-400">
        {group.title}
      </p>

      {#each group.items as menuItem}
        <a href={menuItem.href} on:click|preventDefault={() => (activeItem = menuItem.href)}>
          <li
            class="flex items-center gap-3 xl:p-5 p-4 rounded-2xl font-semibold outline-none transition-colors duration-200"
            use:melt={$item}
            class:bg-green-50={activeItem === menuItem.href}
            class:text-green-700={activeItem === menuItem.href}
            class:border-green-500={activeItem === menuItem.href}
            class:text-gray-600={activeItem !== menuItem.href}
            class:hover:bg-gray-100={activeItem !== menuItem.href}
          >
            <menuItem.icon class="h-4 w-4 md:w-5 md:h-5" />
            <span class="font-semibold">{menuItem.label}</span>
          </li>
        </a>
      {/each}
    </div>

    {#if groupIndex < menuGroups.length - 1}
      <div class="h-px my-5 bg-gray-200" use:melt={$separator}></div>
    {/if}
  {/each}
</ul>
