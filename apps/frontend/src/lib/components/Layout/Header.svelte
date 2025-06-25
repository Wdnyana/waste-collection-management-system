<script lang="ts">
	import type { LayoutProps } from '../../types/type-layout'

	import { ChevronDown, HamburgerMenu } from 'radix-icons-svelte'

	let { open, toggle }: LayoutProps = $props()
</script>

<header
	class="bg-white border-b border-gray-200 lg:px-10 py-4 flex items-center justify-between mb-4 lg:m-0 lg:row-start-1 lg:row-span-1"
	class:lg:col-start-4={open}
	class:lg:col-span-9={open}
	class:lg:col-start-1={!open}
	class:lg:col-span-12={!open}
>
	<div class="flex items-center px-3">
		<button
			onclick={toggle}
			class="lg:hidden mr-4 p-2 rounded-full hover:bg-gray-100"
			aria-label="Buka sidebar"
		>
			<HamburgerMenu class="w-6 h-6" />
		</button>
		{#if !open}
			<h1 class="text-2xl text-center lg:text-start font-semibold lg:ms-5">Dashboard</h1>
		{:else}
			<h1 class="text-2xl font-semibold">Dashboard</h1>
		{/if}
	</div>

	<div class="flex items-center gap-4 pe-4">
		<div class="h-8 w-px bg-gray-200"></div>
		<button class="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100">
			<img
				src="https://placehold.co/40x40/E2E8F0/4A5568?text=JS"
				alt="User Avatar"
				class="w-8 h-8 rounded-full object-cover"
			/>
			<span class="hidden sm:inline font-semibold text-sm">Juliarta Sapoetra</span>
			<ChevronDown class="w-4 h-4 hidden sm:inline text-gray-500" />
		</button>
	</div>
</header>
