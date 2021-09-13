<template>
    <v-card>
        <v-card-title>
            {{data.title}}
        </v-card-title>
        <v-card-subtitle>
            <v-row>
                <v-col>
                    <v-row>
                        <v-col
                            cols="7"
                            lg="10"
                            md="9"
                            sm="7"
                            xs="7"
                        >
                            작성자 {{data.user.username}}
                        </v-col>
                        <v-col
                            class="pa-1"
                            cols="5"
                            lg="2"
                            md="3"
                            sm="5"
                            xs="5"
                        >
                            <span class="float-right">
                                <v-btn
                                    color="secondary"
                                    v-bind="btn_size"
                                    router-link
                                    :to="{name:'CampDetail', query: {tab:'post'}}"
                                >
                                    목록
                                </v-btn>
                                <v-btn
                                    v-if="data.user.id==userid"
                                    class="ml-1"
                                    color="primary"
                                    v-bind="btn_size"
                                    router-link
                                    :to="{name: 'PostWrite', params:{data:data}}"
                                >
                                    수정
                                </v-btn>
                                <DeleteModalView v-if="data.user.id==userid" :btn_size="btn_size" @delete="del" />
                            </span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                            class="pa-0 pl-3"
                            cols="9"
                        >
                            <span>
                                조회 {{data.hit}}
                                <v-icon small class="pointer ml-3" @click="$vuetify.goTo('#comment')">mdi-comment-text-outline</v-icon> 댓글 {{count}}
                            </span>
                        </v-col>
                        <v-col
                            class="pa-0 text-right"
                            cols="3"
                        >
                            {{data.created_at}}
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-subtitle>
        <v-divider />
        <div class="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred">
        <v-card-text v-html="data.content">
        </v-card-text>
        </div>
        <v-card-actions class="ml-3" >
            <v-btn icon @click="good()">
                <v-icon v-if="!goodsActive" small>mdi-thumb-up-outline</v-icon>
                <v-icon v-else small>mdi-thumb-up</v-icon>
                추천 <span>{{goods}}</span>
            </v-btn>
            <v-btn icon class="ml-8">
                <v-icon small class="pointer " @click="$vuetify.goTo('#comment')">mdi-comment-text-outline</v-icon>
                댓글 {{count}}
            </v-btn>
        </v-card-actions>
        <CommentList :action="'PostComment'" :parentWriter="data.user.id" @update:count="val => count = val" />
        <CommentWrite :action="'PostComment'" />
    </v-card>


</template>

<script>
import {getPostDetail,destory,hit_store,good_store} from '@/restApi/board/post';
import DeleteModal from '@/components/unit/DeleteModal';
import {mapGetters, mapState} from "vuex"

export default {
    name: "PostView",
    components: {
        CommentList: () => import(
            '@/components/comment/List'
        ),
        CommentWrite: () => import(
            '@/components/comment/Write'
        ),

        'DeleteModalView':DeleteModal
    },
    data() {
        return {
            count:0,
            goods:0,
            goodsActive: false,
            id:this.$route.params.post,
            data: {
                user:{},
            },
        }
    },
    created() {
      this.fetchData()
      this.hit_update()
    },
    computed: {
        ...mapState('auth',["userid"]),
        // ...mapGetters('auth',{
        //     authData:'loginData'
        // }),
        // userid() {
        //     return (this.authData) ? this.authData.user.id : 0
        // },
        btn_size() {
            const btn_size = {xs:'x-small',sm:'small', md:'small', lg:'small'}[this.$vuetify.breakpoint.name];
            return btn_size ? { [btn_size]: true } : {}
        }
    },
    methods: {
        async fetchData() {
            await getPostDetail(this.$route.params.post).then(response => {
                // console.log(response.data)
                this.data = response.data
                this.goods = response.data.good.length

                // var exists = response.data.good.some(function(field) {
                //     return field.value === this.field.value
                // });
                if(response.data.good.some(data => data.user_id === this.userid)){
                    this.goodsActive = true;
                }


            });
        },
        async del() {
            await destory({data:this.id}).then(response => {
                this.historyBack()
            }).catch(error => {
                alert(error.response.statusText);
            });
        },
        historyBack(route) {
            alert('삭제되었습니다.');
            this.$router.push({name:'CampDetail', query: {tab:'post'}});
        },
        async hit_update() {
            await hit_store({
                data: {
                    id:this.id
                }
            })
        },
        good() {
            // console.log(this.data);
            if(this.userid == 0) {
                alert('로그인이 필요한 서비스 입니다.');
                this.$router.push({name:"Login"})
                return false
            }

            if(this.goodsActive) {
                alert('이미 추천 하셨습니다.')
            } else {
                //good_store
                good_store({
                    data: {
                        id: this.id,
                        user: this.userid
                    }
                }).then(response => {
                    this.goods++
                    this.goodsActive = true;
                }).catch(error => {
                    alert(error.response.statusText);
                });

            }


        }

    }

}
</script>

<style>
</style>
