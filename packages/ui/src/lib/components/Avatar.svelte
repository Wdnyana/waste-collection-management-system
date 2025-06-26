<script lang="ts">
  import { createAvatar, melt } from '@melt-ui/svelte'

  const {
    elements: { image, fallback },
  } = createAvatar({
    src: 'https://avatars.githubusercontent.com/u/1162160?v=4',
  })
</script>

<div class="h-9 w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full flex justify-center">
  <img
    use:melt={$image}
    alt="Avatar"
    class="h-full w-full rounded-[inherit] object-cover object-center"
  />
  <span use:melt={$fallback} class="text-3xl text-center font-medium text-magnum-700">RH</span>
</div>
