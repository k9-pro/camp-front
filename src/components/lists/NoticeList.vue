<template>
    <v-card>
        <v-card-title class="justify-end">
            <div>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"

                />
                <v-spacer />
            </div>
            <div>
                <v-btn
                    v-if="isStaff===true"
                    color="primary"
                    router-link
                    :to="{name: 'NoticeWrite'}"
                    class="ml-10"
                >
                    글쓰기
                </v-btn>
            </div>
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="data"
            :search="search"
            :loading="loading"
            disable-sort
        >
            <template v-slot:item="{ item }" >
                <tr @click="detailView(item.id)" class="pointer">
                    <td :class="headers[0].class">
                        {{count-data.map(function(x) {return x.id; }).indexOf(item.id)}}
                    </td>
                    <td :class="headers[1].class">{{ item.title }}</td>
                    <td :class="headers[2].class">{{ item.user.username }}</td>
                    <td :class="headers[3].class">{{ item.created_at}}</td>
                    <td :class="headers[4].class">{{ item.hit }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
import {getNotice} from '@/restApi/board/notice';
import moment from 'moment';
import {mapGetters} from "vuex"
export default {
    name:'PostList',
    data () {
        return {
            count:0,
            search: '',
            params:{},
            loading: false,
            headers: [
                { text: 'NO', align: 'center', value:'no', sortable: false, class:'text-center' },
                { text: '제목', align: 'center', value: 'title', class:['truncate'] },
                { text: '작성자', align: 'center', value: 'user.username', class:'text-center' },
                { text: '등록일', align: 'center', value: 'created_at', sortable: false, class:'text-center' },
                { text: '조회', align: 'center', value: 'hit', class:'text-center' },
            ],
            data: [],
        }
    },
    created() {
        this.params = {
            site:this.$route.params.id,
            ordering:'-created_at'
        }
        this.fetchData();
    },
    watch: {
        '$route': 'fetchData'
    },
    computed: {
      ...mapGetters('auth',{
            authData:'loginData'
        }),
        isStaff() {
            return (this.authData) ? this.authData.is_staff : false
        },
    },
    methods: {
        async fetchData() {
            this.loading = true
            await getNotice({params:this.params}).then(response => {
                let currentDate = new Date()
                let today = moment(currentDate).format('YYYY-MM-DD');


                // for (let i = 0; i < response.data.results; i++) {}
                response.data.results.forEach( function(val, key) {
                    // console.log(val.created_at);
                    // console.log(key);
                    if(today == moment(val.created_at).format('YYYY-MM-DD')) {
                        val.created_at = moment(val.created_at).format('HH:mm:ss')
                    } else {
                        val.created_at = moment(val.created_at).format('YYYY-MM-DD')
                    }


                });

                // console.log(response.data.results);
                this.count = response.data.count
                this.data = response.data.results
                this.loading = false
            }).catch((error) => {
                console.log(error)
                this.loading = false
            });

        },
        detailView(id) {
            this.$router.push({ name:'NoticeView', params: {notice:id}})
        }
    }
}
</script>
<style>
.truncate {
    max-width:235px;
    min-width:235px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
