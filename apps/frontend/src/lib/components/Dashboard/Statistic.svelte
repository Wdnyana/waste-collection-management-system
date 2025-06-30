<script lang="ts">
	import { CardStatistic, HeaderStatistic } from '@repo/ui'
	import ChartActivity from './ChartActivity.svelte'
</script>

<div class="w-full px-3 lg:px-0 rounded-[10px] !shadow-lg">
	<HeaderStatistic />
	<CardStatistic />
	<ChartActivity />
</div>
