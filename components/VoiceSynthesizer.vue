<template>
   <v-layout justify-center>
      <v-flex>
         <v-btn fab>
            <img @click="play('de')" class="flag" src="../node_modules/flag-icon-css/flags/4x3/de.svg" />
         </v-btn>
      </v-flex>
   </v-layout>
</template>


<script>
import buildUrl from 'build-url'

import playSound from '~/assets/playSound'


export default {
   computed: {
      name() {
         return this.$store.state.names.display
      }
   },
   methods: {
      play(lang) {
         playSound(buildUrl('https://code.responsivevoice.org', {
            path: 'getvoice.php',
            queryParams: {
               t: this.name,
               tl: lang,
               sv: 'g1',
               pitch: 0.5,
               rate: 0.5,
               vol: 1,
               gender: 'female'
            }
         }))
      }
   }
}
</script>



<style lang="scss" scoped>
.flag {
   height: 1.8rem;
   width: auto;
}
</style>
