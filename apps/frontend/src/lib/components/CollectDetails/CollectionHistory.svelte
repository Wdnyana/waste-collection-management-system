<script lang="ts">
	import type { ICollection } from '@repo/shared'

	const { history } = $props<{
		history: ICollection[]
	}>()

	const formattedHistory = $derived(() => {
		if (!history) return []

		const sortedHistory = [...history].sort(
			(a, b) => new Date(b.completedTime || 0).getTime() - new Date(a.completedTime || 0).getTime(),
		)

		return sortedHistory.map((item) => {
			const date = item.completedTime ? new Date(item.completedTime) : null

			const formattedDate = date
				? date
						.toLocaleString('en-GB', {
							weekday: 'short',
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
						})
						.replace(/,/g, '')
				: 'Pending'

			return {
				id: item._id,
				date: formattedDate,
				status: item.status,
			}
		})
	})
</script>

<div class="!w-full h-full">
	<h2
		class="py-4 border-gray-300 border-b-2 w-full text-start font-medium text-fluid-xs xl:text-fluid-base capitalize"
	>
		Collect History
	</h2>

	<div class="py-4">
		{#if formattedHistory.length > 0}
			{#each formattedHistory() as item (item.id)}
				<div class="flex justify-between items-center">
					<p class="text-sm text-gray-700">{item.date}</p>

					<p class="text-gray-500 py-4 text-start font-normal text-fluid-xs mt-2">{item.status}</p>
				</div>
			{/each}
		{:else}
			<p class="text-gray-500 mb-4 text-start font-normal text-fluid-xs py-4">
				No collection history available.
			</p>
		{/if}
	</div>
</div>
