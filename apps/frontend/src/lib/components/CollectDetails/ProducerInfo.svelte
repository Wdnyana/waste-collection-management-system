<script lang="ts">
	import { Table } from '@repo/ui'

	type TableRow = {
		Name: string
		Subject: string
		Age: number
	}

	const tableData: TableRow[] = [
		{
			Name: 'Maria',
			Subject: 'Math',
			Age: 14,
		},
		{
			Name: 'Jose',
			Subject: 'Science',
			Age: 13,
		},
		{
			Name: 'Maria u',
			Subject: 'Math',
			Age: 13,
		},
	]
</script>

<div class="w-full mt-5">
	<Table data={tableData} highlightColumns={['Name', 'Subject']} />
</div>
