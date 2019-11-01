<template>
   <v-card :color="cardColor(available)" class="availabilityCard">
      <v-card-text>
         <v-layout column>
            <!-- <v-icon x-large dark>{{ icon }}</v-icon> -->
            <span class="text-xs-center white--text">
               {{ name }}
            </span>
         </v-layout>
      </v-card-text>
   </v-card>
</template>


<script>
export default {
   props: {
      name: {
         type: String,
         required: true
      },
      icon: {
         type: String,
         required: true
      },
      available: {
         type: String,
         required: true
      }
   },
   methods: {
      cardColor(availability) {
         return availability === 'available' ? 'success' : 'error'
      }
   }
}
</script>


<style scoped>
.availabilityCard {
   margin-bottom: 8px;
}
</style>
