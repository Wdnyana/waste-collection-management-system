<script lang="ts">
	import { ChevronRight } from 'radix-icons-svelte'
	import { sineOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'

	import '@repo/ui/global-styles'
	import '../styles/app.css'
	import Sidebar from '../lib/components/Layout/Sidebar.svelte'
	import Header from '../lib/components/Layout/Header.svelte'

	let { children } = $props()

	let openSidebar: boolean = $state(false)

	onMount(() => {
		if (browser) {
			if (window.innerWidth >= 1024) {
				openSidebar = true
			}
		}
	})

	function sidebarToggle() {
		openSidebar = !openSidebar
	}
</script>

<!-- Latar belakang gelap saat sidebar mobile terbuka -->
{#if openSidebar}
	<div
		onclick={sidebarToggle}
		class="bg-black/50 fixed inset-0 z-10 lg:hidden"
		transition:fly={{ duration: 300, easing: sineOut, opacity: 0.5 }}
	></div>
{/if}

<!-- Tombol untuk MEMBUKA sidebar di desktop -->
{#if !openSidebar && browser && window.innerWidth >= 1024}
	<button
		onclick={sidebarToggle}
		class="hidden lg:block fixed top-[18px] left-1 z-30 p-2 bg-white text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
		aria-label="Buka sidebar"
	>
		<ChevronRight class="w-6 h-6" />
	</button>
{/if}

<div
	class="relative min-h-screen bg-gray-100 text-gray-800 lg:grid lg:grid-cols-12 lg:grid-rows-12"
>
	<!-- Sidebar -->
	<Sidebar open={openSidebar} toggle={sidebarToggle} />

	<!-- div2: Header Konten -->
	<Header open={openSidebar} toggle={sidebarToggle} />
	<!-- div3: Konten Utama -->
	<main
		class="overflow-y-auto mx-4 mb-4 lg:p-7 lg:m-0 lg:row-start-2 lg:row-span-11"
		class:lg:col-start-4={openSidebar}
		class:lg:col-span-9={openSidebar}
		class:lg:col-start-1={!openSidebar}
		class:lg:col-span-12={!openSidebar}
	>
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-full">
			{@render children()}
		</div>
	</main>
</div>
