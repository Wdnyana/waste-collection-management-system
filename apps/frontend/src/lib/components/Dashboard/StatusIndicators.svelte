<script lang="ts">
	import { StatusIndicator } from '@repo/ui'
</script>

<div class="w-full px-3 lg:px-0 rounded-[10px] !shadow-lg">
	<StatusIndicator>
		{#snippet settings()}
			<div class="py-3 px-4 rounded-[10px] !shadow-lg">Setting Here !!</div>
		{/snippet}

		{#snippet monitoring()}
			<div class="py-3 px-4 rounded-[10px] !shadow-lg">
				<h1 class="text-blue-500">asdasdads 2</h1>
			</div>
		{/snippet}

		{#snippet reset()}
			<div class="py-3 px-4 rounded-[10px] !shadow-lg">Reset Here !!</div>
		{/snippet}
	</StatusIndicator>
</div>
