<template>
  <!--  <v-container-->
  <!--    fluid-->
  <!--  >-->
  <v-row
    v-if="camps.length > 0"
  >
    <v-col
      v-for="camp in camps"
      :key="camp.id"
      cols="12"
      xs="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card
        class="mx-auto"
        router
        :to="'/camp/'+camp.id"
      >
        <v-img
          :gradient="camp.is_state=='CLOSE' ? close : open "
          :src="camp.photo"
          height="300"
        >
          <v-card-title
            v-if="camp.is_state === 'CLOSE'"
            class="d-flex flex-wrap text-h4 font-weight-black white--text justify-center pt-16"
          >
            {{ camp.is_state }}
          </v-card-title>
        </v-img>

        <v-card-subtitle class="text-h6 font-weight-black pb-0">
          {{ camp.name }}
        </v-card-subtitle>

        <v-card-text>
          <div>{{ camp.address }}</div>

          <div
            v-if="camp.note"
            class="font-weight-bold"
          >
            {{ camp.note }}
          </div>
          <div
            v-else
            class="font-weight-bold"
          >
            <br>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!--    <v-row-->
  <!--      v-if="camps.length === 0"-->
  <!--    >-->
  <v-row
    v-else
  >
    <v-col
      class="text-h6 text-center"
    >
      검색된 데이터가 없습니다.
      <!--        검색된 데이터가 없습니다.-->
    </v-col>
  </v-row>
<!--  </v-container>-->
</template>
<script>
import {getSite} from '@/restApi/site';
export default {
    name: 'CampList',
    data: () => ({
        page: 1,
        close: 'to bottom, rgba(0,0,0,.85), rgba(0,0,0,.85)',
        open: 'to bottom, rgba(0,0,0,.0), rgba(0,0,0,.0)',
        camps: {},
    }),
    watch: {
        '$route': 'fetchData'
    },
    created(){
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const getData = await getSite({region: +this.$route.params.id});
            console.log(getData);
            this.camps = getData.results;
            if(this.camps.length === 0) {
                this.$emit('childIsFillHeight',true);
            } else {
                this.$emit('childIsFillHeight',false);
            }
            // console.log(this.camps.length);
        }
    }
}
</script>
<style scoped>
/*.a{*/
/*    border: 1px solid red !important;*/
/*}*/
container{
    /*border: 1px solid red !important;*/
    align-items: flex-start !important;
}


</style>
