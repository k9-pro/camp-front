<template>
    <v-container fluid>
        <v-data-iterator
            :items="items"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            :search="search"
            hide-default-footer
            :loading="loading"
        >
            <template v-slot:header>
                <v-toolbar
                    class="mb-1"
                >
                    <v-text-field
                        v-model="search"
                        clearable
                        dense
                        filled
                        full-width
                        hide-details
                        outlined
                        prepend-inner-icon="mdi-magnify"
                        label="검색"
                    />
                    <v-spacer />
                    <!--            :to="'/camp/'+$route.params.id+'/post-write'"-->
                    <v-btn
                        color="primary"
                        router-link
                        :to="{name: 'PostWrite'}"
                    >
                        글쓰기
                    </v-btn>
                </v-toolbar>
            </template>

            <template v-slot:default="props">
                    <v-list dense>
                        <v-list-item v-for="(item,index) in props.items"
                                     :key="index">
                            <v-row @click="detailView(item.id)" class="mt-1 pointer">

                                <v-col >
                                    <v-card height="100%">
                                        <v-row dense>
                                            <v-col
                                                v-if="item.photo"
                                                cols="4"
                                                lg="2"
                                                md="3"
                                                sm="3"
                                                align="center"
                                                class="pa-0"
                                            >
                                                <v-card  class="pa-0 ">
                                                    <v-img
                                                        contain
                                                        dark
                                                        :src="s3root+item.photo"
                                                        aspect-ratio="0.1"
                                                        min-height="136"
                                                        max-height="136"
                                                    />
                                                </v-card>
                                            </v-col>
                                            <v-col>
                                                <v-card-title class="">
                                                    <v-col class="text-h7 font-weight-bold post-title pa-0" >{{item.title}}</v-col>




                                                </v-card-title>
                                                <v-card-text class="post-truncate" v-html="item.content"></v-card-text>
                                                <v-card-actions class="font-weight-light text-caption pa-0">
                                                    <v-col>
                                                         <b class="font-size-bold">{{item.user.username}}</b>
                                                    </v-col>
                                                    <v-col cols="6"  class="pr-3 text-right">
                                                        <span class="font-weight-thin text-caption">{{item.created_at}}</span>
                                                    </v-col>
                                                </v-card-actions>
                                            </v-col>
                                        </v-row>

                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </v-list>
<!--                </v-card>-->
            </template>

            <template v-slot:footer>
                <v-row
                    class="ma-1"
                    align="center"
                    style="float:right"
                >
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                dark
                                text
                                color="primary"
                                class="ml-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                {{ itemsPerPage }}개
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="(number, index) in itemsPerPageArray"
                                :key="index"
                                @click="updateItemsPerPage(number)"
                            >
                                <v-list-item-title>{{ number }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <span
                        class="mr-4
                        grey--text"
                    >
                        Page {{ page }} of {{ numberOfPages }}
                    </span>
                    <v-btn
                        class="mr-1"
                        @click="formerPage"
                        small
                        icon
                    >
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn
                        class="ml-1"
                        @click="nextPage"
                        small
                        icon
                    >
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
            </template>
        </v-data-iterator>

    </v-container>
</template>
<script>
import {getPost} from '@/restApi/board/post';
import moment from "moment";
// import { VuetifyLazyImagePlugin } from "vuetify-lazy-image";
//
// Vue.use(VuetifyLazyImagePlugin);
export default {
    name:'PostList',
    data () {
        return {
            s3root: process.env.VUE_APP_S3_ROOT,
            params: {},
            itemsPerPageArray: [15, 20, 25],
            search: '',
            filter: {},
            loading: false,
            page: 1,
            itemsPerPage: 15,
            keys: [
                'title',
                'good',
                'created_at',
            ],
            items: [],
        }
    },
    created() {
        this.params = {
            site:this.$route.params.id,
            ordering:'-created_at'
        }
        this.fetchData();
    },
    computed: {
        numberOfPages () {
            return Math.ceil(this.items.length / this.itemsPerPage)
        },
        // cols() {
        //     if(this.$vuetify.breakpoint.smAndDown) {
        //         return 8
        //     } else {
        //         return 10
        //     }
        // }
    },
    methods: {
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage () {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage (number) {
            this.itemsPerPage = number
        },
        async fetchData() {
            this.loading = true
            await getPost({params:this.params}).then(response => {
                let currentDate = new Date()
                let today = moment(currentDate).format('YYYY-MM-DD');

                response.data.results.forEach( function(val, key) {
                    if(today == moment(val.created_at).format('YYYY-MM-DD')) {
                        val.created_at = moment(val.created_at).format('HH:mm:ss')
                    } else {
                        val.created_at = moment(val.created_at).format('YYYY-MM-DD')
                    }
                    val.content = val.content.replace(/(<([^>]+)>)/ig,"")
                });

                // console.log(response.data.results);
                this.items = response.data.results
                this.loading = false
            }).catch((error) => {
                console.log(error)
                this.loading = false
            });
        },
        detailView(id) {
            this.$router.push({ name:'PostView', params: {post:id}})
        }
    },
}
</script>
<style scoped>
/*@import '~vuetify/src/styles/settings/_variables';*/

.post-truncate {
    height:3.2em;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break:break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.post-title {
    height:1.6em;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break:break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

</style>
