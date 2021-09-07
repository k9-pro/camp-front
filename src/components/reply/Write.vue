<template>
    <div>
        <v-row justify="center">
            <v-col
                xs="12"
                sm="12"
                md="12"
                lg="12"
                class="pl-6 pr-6"
            >
                <Edit id="edit" @write="write" :cate="'답변 작성'" :flag="'comment'"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Ckeditor from '@/components/edit/Ckeditor'
import {mapState} from "vuex"
import {setPostReply} from "@/restApi/board/post"
import {setFreeReply} from "@/restApi/board/free"

export default {
    name: "ReplyWrite",
    props: {
        action:String,
        comment:Number
    },
    components:{
        'Edit' : Ckeditor
    },
    methods: {
        async write(data) {

            if(data.user == 0) { //비회원 댓글 작성 금지
                alert('로그인이 필요한 서비스 입니다.')
                this.$router.push({name:"Login"})
                return false
            }

            if(data.content == '') {
                alert('내용을 입력해 주세요.')
                return false
            }

            if(this.$route.name == 'PostView') { //후기 답변 작성
                data.post_comment = this.comment
                await setPostReply({data: data}).then(response => {
                    this.$emit('writed:post')
                }).catch(error => {
                    alert(error.response.statusText)
                })


            } else if(this.$route.name == 'FreeView') { //자유 게시판 답변 작성
                data.free_comment = this.comment
                await setFreeReply({data: data}).then(response => {
                    this.$emit('writed:free')
                }).catch(error => {
                    alert(error.response.statusText)
                })
            }
        },
        // historyBack(msg) {
            // alert(msg)
            // this.$emit.fetchData()
        // },
    }
}
</script>

<style>
.ck-editor__editable {
    min-height:100px !important;
}
#edit .ck-toolbar{
    display:none !important;
}
#edit .cate span{
    font-size:13px;
    /*color:rgba(0, 0, 0, 0.6) !important;*/
    padding:2px;
}
</style>
