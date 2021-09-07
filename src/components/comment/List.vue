<template>

    <div ref="comment"

    >

        <v-divider />
        <v-list three-line id="comment">
            <template v-for="(item,index) in items">
                    <v-list-item
                        :key="index"
                    >
    <!--                    <v-list-item-avatar>-->
    <!--                        <v-img :src="item.avatar"></v-img>-->
    <!--                    </v-list-item-avatar>-->

                        <v-list-item-content class="pb-0">
                            <v-list-item-title class="font-weight-bold">{{item.user.username}} <v-spacer /></v-list-item-title>
                            <span v-html="item.content" class="commentList text-body-2"></span>
                            <span class="font-weight-thin text-caption" >{{item.created_at}}</span>
                        </v-list-item-content>

                        <v-list-item-action v-if="item.user.id==userid || parentWriter==userid ">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item-action-text
                                        v-bind="attrs"
                                        v-on="on"
                                        flat
                                        class="text-h8"
                                    >
                                        <v-btn icon>
                                            <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </v-list-item-action-text>
                                </template>
                                <v-list>
                                    <v-list-item
                                        v-if="item.user.id==userid"
                                        dense
                                        @click="del(item.id)"
                                    >
                                            <v-list-item-title>삭제</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                        v-if="parentWriter==userid || item.user.id==userid"
                                        dense
                                        @click="ActiveReply(item.id)"
                                    >
                                        <v-list-item-title>답변</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider
                        v-if="index < items.length"
                        :key="'divider'+index"
                    ></v-divider>


                    <template v-if="item.reply.length>0">
                        <v-list-item
                            v-for="(replyItem,i) in item.reply"
                            :key="'reply_'+replyItem.id"

                        >
                            <!-- 답변 시작 -->
                            <v-list-item-content
                                class="pb-0 pl-15"
                                :key="i"
                            >
                                <v-list-item-title class="font-weight-bold">
                                    <span v-if="parentWriter==replyItem.userid" class="font-weight-regular text-h8">[작성자]</span>
                                    {{replyItem.username}}
                                </v-list-item-title>
                                <span v-html="replyItem.content" class="commentList text-body-2"></span>
                                <span class="font-weight-thin text-caption" >{{replyItem.created_at}}</span>
                            </v-list-item-content>
                            <!-- 답변 끝 -->
                            <v-list-item-action
                                :key="'action_'+i"
                                v-if="replyItem.userid ==userid"
                            >
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-list-item-action-text
                                            v-bind="attrs"
                                            v-on="on"
                                            flat
                                            class="text-h8"
                                        >
                                            <v-btn icon>
                                                <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </v-list-item-action-text>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            dense
                                            @click="replyDel(replyItem.id)"
                                        >
                                            <v-list-item-title>삭제</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-list-item-action>
<!--                        </div>-->
                        </v-list-item>
                        <v-divider
                            :key="'divider_'+index"
                        ></v-divider>
                    </template>



                    <ReplyWrite
                                @writed:post="fetchPostData"
                                @writed:free="fetchFreeData"
                                :key="item.id"
                                :comment="item.id"
                                class="d-none"
                                :class="{'d-flex':activeItem.id == item.id}"
                    />

            </template>
        </v-list>
    </div>
</template>

<script>
import {getFreeComment,destoryFreeComment,destoryFreeReply} from '@/restApi/board/free';
import {getPostComment,destoryPostComment,destoryPostReply} from '@/restApi/board/post';
import {mapState} from "vuex"
export default {
    name: "CommentList",
    props:{
        action:String,
        parentWriter:Number
    },
    components: {
        ReplyWrite: () => import(
            '@/components/reply/Write'
        ),
    },
    data() {
        return {
            count:0,
            params:{},
            items: [
            ],
            activeItem: [],
        }
    },
    created() {
        switch(this.$route.name) {
            case 'PostView' : this.fetchPostData(); break;
            case 'FreeView' : this.fetchFreeData(); break;
        }
        // this.fetchFreeData()
    },
    computed: {
        ...mapState('auth',["userid"])
    },
    methods: {
        async fetchFreeData() {
            this.params = {
                free: this.$route.params.free,
                ordering: '-created_at'
            }
            await getFreeComment({params:this.params}).then(response => {
               // console.log(response.data)
                this.items = response.data.results
                this.count = response.data.count
                console.log(this.items);

                this.$emit('update:count', this.count)
                this.activeItem = [];
            });
        },
        async fetchPostData() {
            this.params = {
                post: this.$route.params.post,
                ordering: '-created_at'
            }
            await getPostComment({params:this.params}).then(response => {
                console.log(response.data)
                this.items = response.data.results
                this.count = response.data.count
                console.log(this.items);

                this.$emit('update:count', this.count)
                // this.$parent.count_update(response.data.count);
                this.activeItem = [];
            });
        },
        async del(id) {
            // console.log(this.action)
            if(confirm('삭제 하시겠습니까?')) {
                if (this.$route.name == 'PostView') { //후기 댓글 삭제
                     await destoryPostComment({data:id}).then( response => {
                         this.$router.go()
                     }).catch(error => {
                         alert(error.response.statusText);
                     });
                } else if (this.$route.name == 'FreeView') { //자유게시판 댓글 삭제
                    await destoryFreeComment({data:id}).then( response => {
                        this.$router.go()
                    }).catch(error => {
                        alert(error.response.statusText);
                    });
                }
            }
        },
        async replyDel(id) { //게시판 댓글 답변 삭제
            if(confirm('삭제 하시겠습니까?')) {
                if (this.$route.name == 'PostView') { //후기 댓글 답변
                    await destoryPostReply({data:id}).then( response => {
                        this.fetchPostData()
                    }).catch(error => {
                        alert(error.response.statusText);
                    });
                } else if (this.$route.name == 'FreeView') { //자유게시판 댓글 답변
                    await destoryFreeReply({data:id}).then( response => {
                        this.fetchFreeData()
                    }).catch(error => {
                        alert(error.response.statusText);
                    });
                }
            }
        },
        ActiveReply(id) {
            this.activeItem = {'id':id}
        },
    }
}
</script>

<style>
.commentList p {
    margin-bottom:0px !important;
}
</style>
