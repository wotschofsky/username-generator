<template>
   <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
         <v-card>
            <v-card-text>
               <v-tabs fixed-tabs>
                  <v-tab ripple>Generator</v-tab>
                  <v-tab ripple>Favorites</v-tab>

                  <v-tab-item>
                     <generator />
                     <!-- <voice-synthesizer /> -->
                     <availability :name="name" />
                  </v-tab-item>
                  <v-tab-item>
                     <favorites />
                  </v-tab-item>
               </v-tabs>
            </v-card-text>
         </v-card>
      </v-flex>
   </v-layout>
</template>


<script>
import { mapMutations } from 'vuex'

import Generator from '~/components/Generator.vue'
import Favorites from '~/components/Favorites.vue'
import Availability from '~/components/Availability.vue'
// import VoiceSynthesizer from '~/components/VoiceSynthesizer.vue'


export default {
   components: {
      Generator,
      Favorites,
      Availability
      // VoiceSynthesizer
   },
   computed: {
      name() {
         return this.$store.state.names.display
      }
   },
   mounted() {
      this.loadFavorites()
   },
   methods: {
      ...mapMutations({
         loadFavorites: 'names/loadFavorites'
      })
   }
}
</script>
