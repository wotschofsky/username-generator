<script>
	import { Card } from 'flowbite-svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';

	import Favorites from '../components/Favorites.svelte';
	import Generator from '../components/Generator.svelte';
</script>

<svelte:head>
	<title>Username Generator</title>
</svelte:head>

<div class="p-8 flex justify-center">
	<Card>
		<Tabs
			style="full"
			defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
			contentClass="mt-8"
		>
			<TabItem class="w-full" open>
				<span slot="title">Generator</span>
				<Generator />
			</TabItem>
			<TabItem class="w-full">
				<span slot="title">Favorites</span>
				<Favorites />
			</TabItem>
		</Tabs>
	</Card>
</div>
