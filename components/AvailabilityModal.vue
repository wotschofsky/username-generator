<template>
   <v-layout row justify-center>
      <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
         <v-card>
            <v-toolbar dark color="primary">
               <v-btn icon dark @click="$emit('close')">
                  <v-icon>arrow_back</v-icon>
               </v-btn>
               <v-toolbar-title>
                  Availability for "{{ name }}"
               </v-toolbar-title>
            </v-toolbar>

            <availability v-if="show" :name="name" autoload />
         </v-card>
      </v-dialog>
   </v-layout>
</template>


<script>
import Availability from '~/components/Availability'


export default {
   components: {
      Availability
   },
   props: {
      name: {
         type: String,
         required: true
      },
      show: {
         type: Boolean,
         default: false
      }
   }
}
</script>
