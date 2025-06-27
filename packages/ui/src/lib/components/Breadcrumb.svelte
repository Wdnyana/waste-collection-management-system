<script lang="ts">
  import type { BreadcrumbItem } from '../types/general'
  import { ChevronRight, ChevronDown } from 'radix-icons-svelte'
  let { items = [] }: { items: BreadcrumbItem[] } = $props()
</script>

<nav aria-label="Breadcrumb" class="w-full">
  <ol class="flex items-center space-x-1 text-sm">
    {#each items as item, i}
      <li class="flex items-center">
        {#if i > 0}
          <ChevronRight class="h-4 w-4 flex-shrink-0 mx-1 text-gray-400" />
        {/if}

        {#if item.href}
          <a
            href={item.href}
            class="flex items-center gap-2 transition-colors px-3 py-2"
            class:px-3={item.variant === 'button'}
            class:py-1={item.variant === 'button'}
            class:bg-green-100={item.variant === 'button'}
            class:rounded-[8px]={item.variant === 'button'}
            class:text-green-700={item.variant === 'button'}
            class:font-semibold={item.variant === 'button'}
            class:hover:bg-green-200={item.variant === 'button'}
            class:text-gray-500={item.variant !== 'button'}
            class:hover:text-green-700={item.variant !== 'button'}
          >
            {#if item.icon}
              <item.icon class="h-4 w-4" />
            {/if}
            <span>{item.label}</span>
            {#if item.hasDropdown}
              <ChevronDown class="h-4 w-4" />
            {/if}
          </a>
        {:else}
          <span class="flex items-center gap-2 font-medium text-gray-500">
            {#if item.icon}
              <item.icon class="h-4 w-4" />
            {/if}
            {item.label}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
