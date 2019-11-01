export const state = () => ({
   favorites: [],
   display: ''
})

export const mutations = {
   loadFavorites(state) {
      state.favorites = JSON.parse(localStorage.getItem('favorites')) || []
   },
   addFavorite(state, name) {
      state.favorites.push(name)
      saveFavorites(state.favorites)
   },
   removeFavorite(state, index) {
      state.favorites.splice(index, 1)
      saveFavorites(state.favorites)
   },
   updateFavorite(state, { index, value }) {
      state.favorites[index] = value
      saveFavorites(state.favorites)
   },
   setDisplay(state, value) {
      state.display = value
   }
}

const saveFavorites = (favorites) => {
   localStorage.setItem('favorites', JSON.stringify(favorites))
}
