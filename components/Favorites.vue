<template>
   <div>
      <p class="text-xs-center" v-if="favorites.length === 0">Nothing here...</p>
      <v-list>
         <v-list-tile v-for="(name, index) in favorites" :key="index" avatar>

            <v-list-tile-content @click="edit(index)">
               <v-text-field v-model="value" :autofocus="true" v-if="index == editing" @blur="blur()"></v-text-field>
               <v-list-tile-title v-text="name" v-else></v-list-tile-title>
            </v-list-tile-content>


            <v-list-tile-action>
               <availability-modal :show="index === show" :name="name" @close="hideAvailability" />
               <v-btn icon ripple @click.stop="showAvailability(index)">
                  <v-icon color="grey lighten-1">search</v-icon>
               </v-btn>
               <v-btn icon ripple @click="remove(index)">
                  <v-icon color="grey lighten-1">delete</v-icon>
               </v-btn>
            </v-list-tile-action>
         </v-list-tile>
      </v-list>
   </div>
</template>


<script>
import { mapMutations } from 'vuex'

import AvailabilityModal from '~/components/AvailabilityModal'


export default {
   components: {
      AvailabilityModal
   },
   data: () => ({
      editing: null,
      value: '',
      show: null
   }),
   computed: {
      favorites() {
         return this.$store.state.names.favorites
      }
   },
   methods: {
      edit(index) {
         this.editing = index
         this.value = this.favorites[index]
      },
      blur() {
         this.update({
            index: this.editing,
            value: this.value
         })
         this.editing = null
         this.value = null
      },
      showAvailability(index) {
         this.show = index
      },
      hideAvailability() {
         this.show = null
      },
      ...mapMutations({
         remove: 'names/removeFavorite',
         update: 'names/updateFavorite'
      })
   }
}
</script>
