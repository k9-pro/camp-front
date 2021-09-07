<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <photo-item />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
    components: {
        PhotoItem: () => import(
            '@/components/lists/PhotoItem'
        )
    }
}
</script>
<style lang="">
</style>

