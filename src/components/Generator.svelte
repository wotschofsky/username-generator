<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { CheckIcon, XIcon } from 'svelte-feather-icons';

	import syllables from '../data/syllables.json';
	import favorites from '../stores/favorites';

	const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

	const generate = () => {
		let output = randomItem(syllables.mixed);
		output += randomItem(syllables.vowels);
		output += Math.random() < 0.5 ? randomItem(syllables.consonants) : '';
		output += randomItem(syllables.mixed);
		output += randomItem(syllables.vowels);
		output += Math.random() < 0.5 ? randomItem(syllables.consonants) : '';
		return output;
	};

	const acceptSuggestion = () => {
		favorites.update((arr) => [...arr, suggestedName]);
		suggestedName = generate();
	};

	const rejectSuggestion = () => {
		suggestedName = generate();
	};

	const handleKeydown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowLeft':
				acceptSuggestion();
				break;
			case 'ArrowRight':
				rejectSuggestion();
				break;
		}
	};

	let suggestedName = generate();
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex align-middle justify-center gap-4">
	<Button color="green" pill={true} size="xl" on:click={acceptSuggestion}>
		<CheckIcon />
	</Button>

	<h5 class="text-4xl font-semibold text-gray-900 dark:text-white">
		{suggestedName}
	</h5>

	<Button color="red" pill={true} size="xl" on:click={rejectSuggestion}>
		<XIcon />
	</Button>
</div>
