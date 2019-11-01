<template>
   <div>
      <v-layout row justify-space-between fill-height>
         <v-flex xs2>
            <v-btn color="success" fab dark @click="save">
               <v-icon>done</v-icon>
            </v-btn>
         </v-flex>
         <v-flex class="text-xs-center">
            <span class="display-2">
               {{ output }}
            </span>
         </v-flex>
         <v-flex xs2>
            <v-btn color="error" fab dark @click="skip">
               <v-icon>close</v-icon>
            </v-btn>
         </v-flex>
      </v-layout>

      <!-- <v-flex xs12 sm6>
         <v-text-field label="Append outer" append-icon="place">
            Ouput
         </v-text-field>
      </v-flex> -->
   </div>
</template>


<script>
import { mapMutations } from 'vuex'

import syllables from '~/assets/syllables.json'
import randomItem from '~/assets/randomItem'


export default {
   computed: {
      output() {
         return this.$store.state.names.display
      }
   },
   mounted() {
      this.generate()

      window.addEventListener('keydown', this.keydown)
   },
   methods: {
      generate() {
         let output = randomItem(syllables.mixed)
         output += randomItem(syllables.vowels)
         output += Math.random() < 0.5 ? randomItem(syllables.consonants) : ''
         output += randomItem(syllables.mixed)
         output += randomItem(syllables.vowels)
         output += Math.random() < 0.5 ? randomItem(syllables.consonants) : ''
         this.setDisplay(output)
      },
      save() {
         this.addFavorite(this.output)
         this.generate()
      },
      skip() {
         this.generate()
      },
      keydown(event) {
         switch(event.code) {
            case('ArrowLeft'):
               this.save()
               break
            case('ArrowRight'):
               this.skip()
               break
         }
      },
      ...mapMutations({
         addFavorite: 'names/addFavorite',
         setDisplay: 'names/setDisplay'
      })
   }
}
</script>
