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
                <Edit id="edit" @write="write" :cate="'댓글작성'" :flag="'comment'"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Ckeditor from '@/components/edit/Ckeditor'
import {mapState} from "vuex"
import {setPostComment} from "@/restApi/board/post"
import {setFreeComment} from "@/restApi/board/free"

export default {
    name: "CommentWrite",
    props: {
      action:String,
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

            if(this.action == 'PostComment') { //후기 댓글 작성
                data.post = this.$route.params.post
                await setPostComment({data: data}).then(response => {
                    const msg = '등록 되었습니다.'
                    this.historyBack(msg)
                }).catch(error => {
                    alert(error.response.statusText)
                })
            } else if(this.action == 'FreeComment') { //자유 게시판 댓글 작성
                data.free = this.$route.params.free
                await setFreeComment({data: data}).then(response => {
                    const msg = '등록 되었습니다.'
                    this.historyBack(msg)
                }).catch(error => {
                    alert(error.response.statusText)
                })
            }
        },
        historyBack(msg) {
            alert(msg)
            this.$router.go()
        },
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
