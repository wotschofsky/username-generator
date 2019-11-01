<template>
   <availability-modal :name="name" />
</template>


<script>
import AvailabilityModal from '~/components/AvailabilityModal'


export default {
   components: {
      AvailabilityModal
   },
   computed: {
      name() {
         return this.$route.params.name
      }
   }
}
</script>
