<script lang="ts">
	import type { LayoutProps } from '../../types/type-layout'

	import { ChevronLeft } from 'radix-icons-svelte'

	let { open, toggle }: LayoutProps = $props()
</script>

<aside
	class="bg-white text-gray-800 shadow-lg fixed inset-y-0 left-0 z-20 w-64 lg:w-auto h-full transform transition-all duration-300 ease-in-out
lg:relative lg:h-auto lg:inset-y-auto lg:left-auto lg:z-auto lg:shadow-none lg:row-span-12 lg:col-span-3"
	class:translate-x-0={open}
	class:-translate-x-full={!open}
	class:lg:block={open}
	class:lg:hidden={!open}
>
	<div class="flex flex-col h-full overflow-y-auto">
		<div class="flex items-center justify-between mb-3 border-b border-gray-200 px-4 py-6">
			<h2 class="text-2xl font-bold tracking-wider text-gray-800">WWWASTE</h2>
			<button
				onclick={toggle}
				class="p-1 rounded-full text-gray-500 hover:bg-gray-100"
				aria-label="Tutup sidebar"
			>
				<ChevronLeft class="w-5 h-5" />
			</button>
		</div>

		<nav class="flex-grow p-4">
			<ul>
				<li class="mb-5">
					<a
						href="#"
						class="flex items-center gap-3 xl:p-6 p-4 rounded-2xl text-green-700 bg-green-50 border-green-500 font-semibold"
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
			</ul>
		</nav>
	</div>
</aside>
