import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const loadFavorites = (): string[] => {
	if (!browser) {
		return [];
	}

	const loadedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
	const loadedIsValid =
		Array.isArray(loadedFavorites) && loadedFavorites.every((item) => typeof item === 'string');

	return loadedIsValid ? loadedFavorites : [];
};

const favorites = writable(loadFavorites());

favorites.subscribe((value) => {
  if (!browser) {
    return;
  }

	localStorage.setItem('favorites', JSON.stringify(value));
});

export default favorites;
