<template>
   <v-app>
      <toolbar />

      <v-content>
         <v-container>
            <nuxt />
         </v-container>
      </v-content>

      <v-footer :fixed="fixed" app>
         <span>&copy; 2019</span>
      </v-footer>
   </v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar.vue';


export default {
   components: {
      Toolbar
   },
   data: () => ({
      fixed: false
   })
}
</script>
