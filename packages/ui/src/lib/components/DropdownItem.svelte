<script lang="ts">
  import type { MenuItem } from '../types/general'

  const { href, melt, children }: MenuItem = $props()
</script>

<a {href}>
  <div
    class="relative flex h-6 min-h-[24px] select-none items-center rounded-[5px] py-4 mb-1 px-3 text-sm leading-none text-magnum-900 outline-none data-[disabled]:text-neutral-300 data-[highlighted]:bg-magnum-200"
    use:melt={melt}
  >
    {@render children()}
  </div>
</a>
