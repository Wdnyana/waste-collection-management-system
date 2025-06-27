<script lang="ts">
	import { ChevronRight } from 'radix-icons-svelte'
	import { sineOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'

	import { Button } from '@repo/ui'
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

<!-- sidebar mobile terbuka -->
{#if openSidebar}
	<button
		onclick={sidebarToggle}
		class="bg-black/50 cursor-pointer fixed inset-0 z-10 lg:hidden"
		transition:fly={{ duration: 300, easing: sineOut, opacity: 0.5 }}
		aria-label="Tutup sidebar"
	></button>
{/if}

{#if !openSidebar && browser && window.innerWidth >= 1024}
	<Button
		variant="outline"
		size="icon"
		onclick={sidebarToggle}
		class="hidden cursor-pointer text-gray-900 border-none lg:block fixed top-[20px] left-5 z-30 p-2 rounded-full transition-colors"
		aria-label="Buka sidebar"
	>
		<ChevronRight class="w-6 h-6" />
	</Button>
{/if}

<div class="relative h-screen bg-gray-100 text-gray-800 lg:grid lg:grid-cols-12 lg:grid-rows-12">
	<!-- Sidebar Konten -->
	<Sidebar open={openSidebar} toggle={sidebarToggle} />

	<!-- Header Konten -->
	<Header open={openSidebar} toggle={sidebarToggle} />

	<!-- Main Konten -->
	<main
		class="h-full overflow-y-auto mx-4 mb-4 lg:p-4 lg:m-0 lg:row-start-2 lg:row-span-11 scroll-bar"
		class:lg:col-start-4={openSidebar}
		class:lg:col-span-9={openSidebar}
		class:xl:col-start-3={openSidebar}
		class:xl:col-span-10={openSidebar}
		class:lg:col-start-1={!openSidebar}
		class:lg:col-span-12={!openSidebar}
	>
		{@render children()}
	</main>
</div>
