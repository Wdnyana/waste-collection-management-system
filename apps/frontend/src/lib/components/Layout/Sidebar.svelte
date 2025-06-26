<script lang="ts">
	import { slide } from 'svelte/transition'
	import { ChevronLeft } from 'radix-icons-svelte'
	import { DropdownMenu } from '@repo/ui'

	import { SidebarItem } from '@repo/ui'
	import type { LayoutProps } from '../../types/type-layout'
	import Logo from '../../assets/Group.png'

	let { open, toggle }: LayoutProps = $props()
</script>

{#if open}
	<aside
		class="bg-white text-gray-800 shadow-lg fixed inset-y-0 left-0 z-20 w-64 lg:w-auto h-screen
lg:relative lg:inset-y-auto lg:left-auto lg:z-auto lg:shadow-none lg:row-span-12 lg:col-span-3 xl:col-span-2"
		transition:slide={{ duration: 250, axis: 'x' }}
		class:translate-x-0={open}
		class:-translate-x-full={!open}
		class:lg:block={open}
		class:lg:hidden={!open}
	>
		<div class="flex flex-col h-full">
			<div
				class="flex items-center justify-between border-b border-gray-200 px-4 py-[20.5px] lg:py-[18.5px] xl:py-[22.5px]"
			>
				<div class="flex items-center">
					<a href="/">
						<img src={Logo} alt="WWWASTE" class="h-8 lg:h-9 me-4" />
					</a>

					<h2 class="text-xl md:text-2xl font-bold tracking-wider text-gray-800">WWWASTE</h2>
				</div>
				<button
					onclick={toggle}
					class="p-2 rounded-full -me-3 text-gray-500 hover:bg-gray-100"
					aria-label="Tutup sidebar"
				>
					<ChevronLeft class="w-5 h-5" />
				</button>
			</div>

			<nav class="flex-grow px-4 py-2 my-2 overflow-y-auto">
				<SidebarItem />
			</nav>

			<div
				class="p-4 text-sm text-gray-400 border-gray-200 transition-opacity flex justify-start items-start -ms-9 md:-ms-4 lg:hidden border-t"
				class:lg:opacity-0={!open}
			>
				<DropdownMenu />
			</div>
		</div>
	</aside>
{/if}
