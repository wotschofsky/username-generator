<template>
   <div v-if="!autoload && !autoloadDismissed">
      <v-layout justify-center>
         <v-btn color="primary" @click="load">Check availability</v-btn>
      </v-layout>
   </div>
   <div v-else-if="!loaded">
      <v-layout justify-center>
         <v-progress-circular indeterminate color="primary" :size="64" :width="8" />
      </v-layout>
   </div>
   <div v-else-if="!error">
      <v-layout justify-space-around wrap>
         <v-flex v-for="(value, key, index) in domains" :key="key" xs3 :offset-xs1="index % 3 !== 0">
            <availability-card :name="key" icon="earth" :available="value"/>
         </v-flex>
         <v-flex v-for="(value, key, index) in social" :key="key" xs3 :offset-xs1="(index + domainsLength) % 3 !== 0">
            <availability-card :name="key" :icon="key" :available="value"/>
         </v-flex>
      </v-layout>
   </div>
   <div v-else>
      <v-alert :value="true" type="error">
         Couldn't connect to server!
      </v-alert>

      <v-layout justify-center>
         <v-btn color="primary" @click="load">Try again</v-btn>
      </v-layout>
   </div>
</template>


<script>
import AvailabilityCard from './AvailabilityCard.vue'


export default {
   components: {
      AvailabilityCard
   },
   props: {
      name: {
         type: String,
         required: true
      },
      autoload: {
         type: Boolean,
         default: false
      }
   },
   data: () => ({
      result: null,
      error: false,
      loaded: false,
      autoloadDismissed: false,
      prevName: null,
      interval: null
   }),
   computed: {
      domains() {
         return this.result.data.results.domains
      },
      domainsLength() {
         let size = 0;
         for(let key in this.domains) {
            size++
         }
         return size
      },
      social() {
         return this.result.data.results.social
      }
   },
   mounted() {
      this.prevName = this.name
      if(this.name !== '' && this.autoload) {
         this.load()
      }

      this.interval = setInterval(() => {
         if(this.name != this.prevName) {
            this.prevName = this.name
            this.autoloadDismissed = false
            this.loaded = false
         }
      }, 100)
   },
   beforeDestroy() {
      clearInterval(this.interval)
   },
   methods: {
      async load() {
         this.autoloadDismissed = true
         try {
            this.result = await this.$axios({
               url: 'https://us-central1-username-generator-tool.cloudfunctions.net/checkAvailability',
               params: {
                  name: this.name
               }
            })
            this.loaded = true
         }
         catch {
            this.error = true
            this.loaded = true
         }
      }
   }
}
</script>
