<script lang="ts">
	import { slide } from 'svelte/transition'
	import { ChevronLeft } from 'radix-icons-svelte'
	import { DropdownMenu } from '@repo/ui'

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
				class="flex items-center justify-between border-b border-gray-200 px-4 py-[20.5px] lg:py-[17px] xl:py-[21px]"
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
				<ul>
					<li class="mb-5">
						<a
							href="#"
							class="flex items-center gap-3 xl:p-5 p-4 rounded-2xl text-green-700 bg-green-50 border-green-500 font-semibold"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								></path></svg
							>
							<span class="font-semibold">Dashboard</span>
						</a>
					</li>
					<li class="mb-2">
						<a href="#" class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								></path></svg
							>
							<span class="font-semibold">Analytics</span>
						</a>
					</li>
					<!-- Tambahkan lebih banyak item di sini untuk mengetes scroll -->
					{#each Array(15) as _, i}
						<li class="mb-2">
							<a href="#" class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
								<span class="w-5 h-5 block"></span>
								<!-- Placeholder untuk ikon -->
								<span class="font-semibold">Menu Item {i + 1}</span>
							</a>
						</li>
					{/each}
				</ul>
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
