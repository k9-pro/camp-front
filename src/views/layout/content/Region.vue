<template>
  <v-container
    fluid
    :fill-height="fillHeight"
  >
    <CampItem
      @childIsFillHeight="handleChange($event)"
    />
  </v-container>
</template>
<script>
export default {
    components: {
        CampItem: () => import(
            '@/components/lists/CampList'
        )
    },

    data() {
        return{
            fillHeight: false,
        }
    },
    methods: {
        handleChange(event){
            this.fillHeight=event;
        }
    }
}
</script>
<style scoped>

</style>
