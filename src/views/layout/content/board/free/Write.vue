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
import {store,update} from '@/restApi/board/free'


export default {
    name: "Write",
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
        this.fetchData()
        // console.log(this.$route.params.data.id)
    },
    methods: {
        async fetchData() {
            const getData = await getSiteDetails({id: +this.$route.params.id})
            this.camps = getData
            this.region = getData.location.name
        },
        // async write(data) {
        async write(data) {
            // console.log(data)
            data.site = this.$route.params.id

            if(this.$route.params.data) {
                //글수정
                data.id = this.$route.params.data.id

                let route = { name:'FreeView', params: {free:data.id} }
                await update({data: data}).then(response => {
                    const msg = '변경 되었습니다.'
                    this.historyBack(route,msg)
                }).catch(error => {
                    alert(error.response.statusText)
                })

            } else {
                //글작성
                let route = { name:'CampDetail', query: {tab:'free'} }
                await store({data: data}).then(response => {
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
