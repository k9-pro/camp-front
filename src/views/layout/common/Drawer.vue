<template>
  <v-navigation-drawer
    v-bind="$attrs"
    app
    absolute
    temporary
  >
    <v-list-item>
      <v-list-item-content>
        <router-link
          class="text-h3 font-weight-bold text-center"
          :to="`/`"
          tag="button"
        >
          <v-icon
            large
          >
            mdi-tent
          </v-icon>
          KAMP9
        </router-link>
        <v-list-item-subtitle>
          <!-- subtext -->
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in region"
        :key="item.id"
        router
        :to="'/region/'+item.id"
      >
        <!-- <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon> -->

        <v-list-item-content>
          <v-list-item-title class="text-h7 text-center ">
            {{ item.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { getRegion } from '@/restApi/region';

export default {
    name: 'DefaultDrawer',
    data() {
	    return {
            region: {},
        }
    },
    created() {
        this.init();
    },
    methods: {
	    async init() {
	        this.region = await getRegion();
        }
    }
}
</script>
<style lang="">

</style>
