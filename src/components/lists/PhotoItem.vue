<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <v-container fluid>
        <v-row>

            <v-col cols="12" class="text-h5 font-weight-bold">
                <v-icon>
                    mdi-thumb-up
                </v-icon>
                캠핑 후기 추천 순위 TOP 10
            </v-col>
        </v-row>
      <v-row dense>
        <v-col
          v-for="(item,index) in items"
          :key="item.title"
          cols="12"
          sm="12"
          md="2"
          lg="2"
          :class="{'custom5cols':$vuetify.breakpoint.mdAndUp}"
        >
          <v-card
              link
              :to="'/camp/'+item.siteid+'/post-view/'+item.id"
          >
            <v-img
              :src="s3root+item.photo"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
                <v-app-bar
                    absolute
                    color="rgba(0, 0, 0, 0)"
                    tile
                    flat
                >
                    <v-toolbar-title class="text-h4 white--text pl-0">{{index+1}}</v-toolbar-title>
                </v-app-bar>
              <v-card-title v-text="item.sitename" />
              <v-card-subtitle v-text="item.title" />
            </v-img>

<!--            <v-card-actions>-->
<!--                {{item.username}}-->
<!--              <v-spacer />-->
<!--                추천 {{item.good_count}}-->
<!--            </v-card-actions>-->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { getBestPost } from '@/restApi/board/post'
import { mapGetters } from "vuex"
export default {
    name: 'PhotoItem',
    data: () => ({
        items:{}
    }),
    created() {
        this.fetchData()
    },
    computed: {
        ...mapGetters(["s3root"])
    },
    methods: {
        async fetchData() {
            const getData = await getBestPost()
            this.items = getData.data
        },
    }
}
</script>
<style lang="css">
.custom5cols{
    width: 20%;
    max-width: 20%;
    flex-basis: 20%;
}
</style>
