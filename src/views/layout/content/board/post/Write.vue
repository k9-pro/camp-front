<template>
    <v-container
        fluid
    >
        <Edit @write="write" :cate="region+' > '+camps.name"/>
    </v-container>
</template>

<script>
import Ckeditor from '@/components/edit/Ckeditor'
import {getSiteDetails} from '@/restApi/site'
import {store,update} from '@/restApi/board/post'
import UploadAdapter from '@/components/edit/UploadAdapter';

export default {
    name: "PostWrite",
    components:{
        'Edit' : Ckeditor
    },
    data() {
        return {
            region : '',
            camps:{},
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const getData = await getSiteDetails({id: +this.$route.params.id});
            // console.log(getData);
            this.camps = getData;
            this.region = getData.location.name;
            // console.log(getData);
        },
        async write(data) {
            data.site = this.$route.params.id
            data.photo=data.imageName ? data.imageName.name : null

            if(this.$route.params.data) {
                //글수정
                data.id = this.$route.params.data.id
                let route = { name:'PostView', params: {post:data.id} }

                if(data.imageName && data.imageName.type) { //이미지 업로드
                    // console.log(data.imageName);
                    let upload = new UploadAdapter()
                    let promise = upload.s3upload(data.imageName).promise()

                    promise.then(
                        function(res) {
                            console.log(res)
                            return true
                        },
                        function(err) {
                            alert("대표이미지 업로드 실패 ", err.message)
                            return false
                        }
                    )
                }

                await update({data: data}).then(response => {
                    const msg = '변경 되었습니다.'
                    this.historyBack(route,msg)
                }).catch(error => {
                    // alert(error)
                    alert(error.response.statusText)
                })

            } else {
                //글작성
                let route = { name:'CampDetail', query: {tab:'post'} }


                if(data.imageName && data.imageName.type) { //이미지 업로드
                    // console.log(data.imageName)
                    let upload = new UploadAdapter()
                    let promise = upload.s3upload(data.imageName).promise()

                    promise.then(
                        function(res) {
                            console.log(res)
                            return true
                        },
                        function(err) {
                            alert("대표이미지 업로드 실패 ", err.message)
                            return false
                        }
                    )
                }

                await store({data: data}).then(response => {
                    // let upload = new UploadAdapter( {
                    //     file:data.photo
                    // })

                    // upload.upload
                    const msg = '등록 되었습니다.'
                    this.historyBack(route,msg)
                }).catch(error => {
                    alert(error.response.statusText)
                })
            }


        },
        historyBack(route,msg) {
            alert(msg)
            this.$router.push(route)
        },
    }

    // components: {
    //     Ckeditor: () => import(
    //         '@/components/edit/Ckeditor'
    //         )
    // },
}
</script>

<style scoped>

</style>
