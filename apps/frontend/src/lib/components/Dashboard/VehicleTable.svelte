<script lang="ts">
	import { Table } from '@repo/ui'

	type TableRow = {
		Name: string
		Subject: string
		Age: number
		Val: number
	}

	const tableData: TableRow[] = [
		{
			Name: 'Maria',
			Subject: 'Math',
			Age: 14,
			Val: 5.5,
		},
		{
			Name: 'Jose',
			Subject: 'Science',
			Age: 13,
			Val: 7.5,
		},
		{
			Name: 'Maria u',
			Subject: 'Math',
			Age: 13,
			Val: 9.5,
		},
		{
			Name: 'Joseb',
			Subject: 'Science',
			Age: 15,
			Val: 8.5,
		},
	]
</script>

<div class="w-full">
	<Table data={tableData} highlightColumns={['Name', 'Subject']} />
</div>
