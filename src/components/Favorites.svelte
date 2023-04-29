<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow, Button, Input } from 'flowbite-svelte';
	import { TrashIcon } from 'svelte-feather-icons';

	import favorites from '../stores/favorites';

	let editingIndex = -1;
	let editingValue = '';

	const deleteFavorite = (favorite: string) => {
		favorites.update((arr) => arr.filter((item) => item !== favorite));
	};
</script>

<Table>
	<TableBody class="divide-y">
		{#each $favorites as favorite, index}
			<TableBodyRow>
				<TableBodyCell>
					{#if editingIndex !== index}
						<span
							on:click={() => {
								editingIndex = index;
								editingValue = favorite;
							}}>{favorite}</span
						>
					{:else}
						<Input
							bind:value={editingValue}
							on:blur={() => {
								editingIndex = -1;
								$favorites[index] = editingValue;
							}}
							autofocus
						/>
					{/if}
				</TableBodyCell>
				<TableBodyCell>
					<Button
						pill={true}
						outline={true}
						class="!p-2"
						size="xs"
						on:click={() => deleteFavorite(favorite)}
					>
						<TrashIcon />
					</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
