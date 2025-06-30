<script lang="ts">
  import { createDialog, melt, createLabel } from '@melt-ui/svelte'

  import { Sparkles, X, SendHorizontal } from '@lucide/svelte'
  import { fade } from 'svelte/transition'
  import Button from './Button.svelte'

  const {
    elements: { trigger, overlay, content, title, description, close, portalled },
    states: { open },
  } = createDialog({
    forceVisible: true,
  })
</script>

<button
  use:melt={$trigger}
  class="flex w-full md:!w-auto gap-2 lg:gap-3 items-center justify-center gap-2 rounded-[8px] px-4 py-3 font-medium leading-none text-magnum-500 border border-magnum-500 focus:relative data-[state=active]:focus:relative data-[state=active]:bg-magnum-500 data-[state=active]:text-magnum-500 data-[state=active]:border-transparent text-magnum-500 active:text-magnum-500 font-medium leading-10 text-[14px] md:text-base bg-transparent cursor-pointer"
>
  AI Mira
  <Sparkles class="h-5 w-5" />
</button>

{#if $open}
  <div class="" use:melt={$portalled}>
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 bg-black/50"
      transition:fade={{ duration: 150 }}
    ></div>
    <div
      class="fixed inset-y-0 md:!top-16 md:right-2 h-full max-h-full md:max-h-[85vh] lg:top-20 z-50 w-full md:max-w-[500px] xl:max-w-[600px] rounded-[8px] p-6 bg-white shadow-lg"
      transition:fade={{ duration: 150 }}
      use:melt={$content}
    >
      <div class="bg-white h-full flex flex-col justify-between items-start">
        <div>
          <h1
            use:melt={$title}
            class="text-start mt-4 xl:mt-6 pb-1 text-fluid-base xl:text-fluid-lg text-green-800"
          >
            Nama Pengguna
          </h1>
          <p class="mt-1 text-start text-base text-gray-500 text-muted">Im Mira</p>
        </div>

        <p
          use:melt={$description}
          class="text-[14px] text-gray-500 font-normal text-center leading-10"
        >
          I’m Mira, the AI that transforms wwwaste.io’s raw collection data into actionable
          insights. I help you monitor performance, detect trends, flag anomalies, and guide
          decision-making across waste operations
        </p>

        <div class="w-full">
          <h2 use:melt={$title} class="text-center pb-1 text-fluid-base text-green-400">
            What can i help with?
          </h2>

          <div class="flex flex-col md:!flex-row md:!items-strech md:!justify-center my-4 gap-4">
            <p
              class="md:basis-1/2 text-[14px] text-center px-4 py-5 rounded-[8px] border border-gray-300 text-gray-500 font-normal leading-10"
            >
              Show Me Today’s on-time pickup rate by region
            </p>

            <p
              class="md:basis-1/2 text-[14px] text-center px-4 py-5 rounded-[8px] border border-gray-300 text-gray-500 font-normal leading-10"
            >
              Generate a chart comparing scheduled vs completed pickups this week
            </p>
          </div>
          <form>
            <div class="relative w-full">
              <input
                type="text"
                class="py-4 ps-5 pe-12 lg:px-6 w-full border border-gray-300 focus:border-gray-300 active:border-gray-300 data-[state=active]:border-transparent data-[state=active]:focus:border-transparent data-[state=active]:active:border-transparent rounded-[19px] text-gray-900 bg-gray-100 line-clamp-1"
                placeholder="Ask anything about waste"
              />
              <Button
                type="submit"
                class="absolute bg-transparent cursor-pointer inset-y-2 right-[2px] lg:right-1 text-green-800 data-[state=active]:bg-transparent focus:bg-transparent hover:bg-transparent flex items-center"
                aria-label="Send message"
              >
                <SendHorizontal class="h-6 w-6" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <button
        use:melt={$close}
        aria-label="close"
        class="absolute cursor-pointer right-4 top-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full p-1 text-gray-800 hover:bg-text-gray-400 focus:shadow-magnum-400"
      >
        <X class="size-4" />
      </button>
    </div>
  </div>
{/if}
