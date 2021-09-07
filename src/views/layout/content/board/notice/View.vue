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
                            cols="8"
                            lg="10"
                            md="9"
                            sm="8"
                            xs="8"
                        >
                            작성자 {{data.user.username}}
                        </v-col>
                        <v-col
                            class="pa-1"
                            cols="4"
                            lg="2"
                            md="3"
                            sm="4"
                            xs="4"
                        >
                            <span class="float-right">
                                <v-btn
                                    color="secondary"
                                    v-bind="btn_size"
                                    router-link
                                    :to="{name:'CampDetail', query: {tab:'notice'}}"
                                >
                                    목록
                                </v-btn>
                                <v-btn
                                    v-if="data.user.id==userid"
                                    class="ml-1"
                                    color="primary"
                                    v-bind="btn_size"
                                    router-link
                                    :to="{name: 'NoticeWrite', params:{data:data}}"
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
        <v-card-text v-html="data.content">
        </v-card-text>
    </v-card>


</template>

<script>
import {getNoticeDetail,destory,hit_store} from '@/restApi/board/notice';
import {mapGetters, mapState} from "vuex";
export default {
    name: "NoticeView",
    components: {
        DeleteModalView: () => import(
            '@/components/unit/DeleteModal'
        ),
    },
    data() {
        return {
            count:0,
            id:this.$route.params.notice,
            data: {
                user:{}
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
            await getNoticeDetail(this.$route.params.notice).then(response => {
                console.log(response.data)
                this.data = response.data
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
            this.$router.push({name:'CampDetail', query: {tab:'notice'}});
        },
        async hit_update() {
            await hit_store({
                data: {
                    id:this.id
                }
            })
        }
    }

}
</script>

<style>
</style>
