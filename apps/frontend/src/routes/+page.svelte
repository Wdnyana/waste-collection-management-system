<script lang="ts">
	import { Breadcrumb, Tabs } from '@repo/ui'
	import { breadcrumbItemsMobile } from '../lib/utils/breadcrumb'
	import StatusIndicators from '../lib/components/Dashboard/StatusIndicators.svelte'
</script>

<!-- konten dibawah ini -->
<div class="overflow-x-hidden">
	<div class="mx-3 mb-5 md:hidden">
		<Breadcrumb items={breadcrumbItemsMobile} />
	</div>

	<div class="w-full">
		<Tabs>
			{#snippet realtime()}
				<StatusIndicators />
			{/snippet}

			{#snippet history()}
				<div class="py-3 px-4">
					<h1 class="text-blue-500">asdasdads 2</h1>
				</div>
			{/snippet}

			{#snippet statistic()}
				<div class="py-3 px-4">
					<h1 class="text-green-500">asdasdads 1</h1>
				</div>
			{/snippet}
		</Tabs>
	</div>
</div>
