<script lang="ts">
	import type { LayoutProps } from '../../types/type-layout'
	import { DropdownMenu } from '@repo/ui'

	import { HamburgerMenu, PinRight } from 'radix-icons-svelte'

	let { open, toggle }: LayoutProps = $props()
</script>

<header
	class="bg-white border-b border-gray-200 lg:ps-5 lg:pe-3 py-4 border flex items-center justify-between mb-4 lg:m-0 lg:row-start-1 lg:row-span-1"
	class:lg:col-start-4={open}
	class:lg:col-span-9={open}
	class:xl:col-start-3={open}
	class:xl:col-span-10={open}
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
			<h1 class="ps-3 text-2xl text-center lg:text-start font-semibold lg:ms-5">Dashboard</h1>
		{:else}
			<h1 class="text-center ps-3 lg:text-start text-2xl font-semibold">Dashboard</h1>
		{/if}
	</div>

	<div class="flex items-center h-full gap-4 pe-4">
		<div class="hidden md:block h-10 w-px p-0 bg-gray-200"></div>
		<div class="hidden md:flex items-center">
			<DropdownMenu />
		</div>

		<button class="ms-4 p-2 rounded-full">
			<PinRight class="h-7 w-7 text-red-500" />
		</button>
	</div>
</header>
