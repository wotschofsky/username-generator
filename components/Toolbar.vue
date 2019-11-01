<template>
   <v-toolbar fixed app dark color="primary">
      <v-toolbar-title v-text="title" />
   </v-toolbar>
</template>


<script>
import { mapState } from 'vuex';


export default {
   computed: {
      title() {
         return this.$store.state.meta.title
      }
   }
}
</script>
