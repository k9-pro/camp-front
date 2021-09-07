<template>
  <v-row>
    <v-col
      xs="12"
      sm="12"
      md="12"
      lg="4"
      class="pa-8"
      app
    >
      <v-card
        class="mx-auto"
      >
        <v-img
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.0), rgba(0,0,0,.0)"
          :src="camps.photo"
        >
        </v-img>

          <v-card-title class="text-h6 pb-0">
              {{ camps.name }}
              <v-spacer />
              <v-btn
                  icon
                  bottom
                  right
                  @click="dialog = true"
              >
                  <v-icon>
                      mdi-share-variant
                  </v-icon>
              </v-btn>
          </v-card-title>

        <v-dialog
          v-model="dialog"
          max-width="300px"
        >
          <KakaoShare />
        </v-dialog>

        <v-card-text>
          <v-row>
            <v-col
              cols="10"
              justify="end"
            >
              <v-text-field
                id="tocopy"
                ref="textToCopy"
                v-model="camps.address"
                readonly
              />
            </v-col>
            <v-col
              clos="2"
              align-self="center"
            >
              <v-icon
                small
                class="ml-1"
                @click="copy"
              >
                mdi-content-copy
              </v-icon>
            </v-col>
          </v-row>

          <div class="font-weight-bold">
            {{ camps.note }}
          </div>
        </v-card-text>
      </v-card>

      <v-card
        class="mx-auto"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5">
              <!-- San Francisco -->
            </v-list-item-title>
            <v-list-item-subtitle>{{weekTime}}, {{weather.description}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              class="text-h2"
            >
                {{weather.main.temp}}&deg;C
            </v-col>
            <v-col
              cols="4"
              sm="3"
              md="5"
              lg="4"
            >
              <!-- http://openweathermap.org/img/wn/10n@2x.png -->
              <v-img
                  :src="weather.icon"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{wind.speed}} m/s</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{clouds}}%</v-list-item-subtitle>
        </v-list-item>
          <v-divider />
          <v-card-text>
              <v-card-text class="pl-0 font-weight-bold">시간대별 날씨</v-card-text>
              <v-row>
                  <v-col
                      v-for="item in hourly"
                      :key="item.hour"
                      class="custom7cols text-center"
                  >
                      <v-row>
                          <v-col>{{item.hour}}</v-col>
                      </v-row>
                      <v-row>
                          <v-col><v-img
                              :src="item.icon"
                          /></v-col>
                      </v-row>
                      <v-row>
                          <v-col>{{ item.temp }}&deg;</v-col>
                      </v-row>
                  </v-col>
              </v-row>
          </v-card-text>
          <v-divider />
          <v-card-text>
              <v-card-text class="pl-0 font-weight-bold">주간 날씨</v-card-text>
              <v-row>
                  <v-col
                         v-for="item in daily"
                         :key="item.day"
                         class="custom7cols text-center"
                  >
                      <v-row>
                          <v-col>{{item.day}}</v-col>
                      </v-row>
                      <v-row>
                          <v-col><v-img
                              :src="item.icon"
                          /></v-col>
                      </v-row>
                      <v-row>
                          <v-col>{{ item.temp_max }}&deg;/{{item.temp_min}}&deg;</v-col>
                      </v-row>
                  </v-col>
              </v-row>
          </v-card-text>

        <v-divider />

      </v-card>
    </v-col>
    <!-- 게시판 영역 -->
    <v-col
      class="pa-7"
      cols="12"
      lg="8"
      md="12"
    >
      <v-card>
        <v-tabs
          v-model="activeTab"
          color="teal darken-1 accent-4"
          left
        >
          <v-tab href="#post">
            후기
          </v-tab>
          <v-tab href="#free">
            자유게시판
          </v-tab>
          <v-tab href="#notice">
            공지사항
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item value="post">
            <PostList />
          </v-tab-item>
          <v-tab-item value="free">
            <FreeList />
          </v-tab-item>
          <v-tab-item value="notice">
            <NoticeList />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import PostList from '../../../../components/lists/PostList.vue'
import {getSiteDetails} from '@/restApi/site'
import {getWeather} from '@/restApi/weather'
import moment from 'moment';

export default {
    components: {
        KakaoShare: () => import(
            '@/components/share/Kakao'
        ),
        PostList: () => import(
            '@/components/lists/PostList'
        ),
        FreeList: () => import(
            '@/components/lists/FreeList'
        ),
        NoticeList: () => import(
            '@/components/lists/NoticeList'
        ),
    },
    data () {
        return {
            tab:0,
            labels: ['일', '월', '화', '수', '목', '금', '토'],
            weekTime: null,
            dialog: false,
            daily: [],
            hourly: [],
            weather: {
                icon:'',
                description:'',
                main:{
                    temp:0,
                    temp_max:0,
                    temp_min:0,
                }
            },
            wind: {
              speed:0,
            },
            rain: {},
            clouds:0,
            camps: {
            },
        }
    },
    computed:{
        activeTab: {
            set(val) {
                this.$router.replace({query: {tab:val}})

            },
            get() {
                return this.$route.query.tab;
            }
        }
    },
    watch: {
        dialog(val) {
            if(!val) return
            setTimeout(() => (this.dialog = false), 4000)
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const getData = await getSiteDetails({id:+this.$route.params.id});
            this.camps = getData;
            // console.log(getData);
            //getData.weather
            const getWeatherData = await getWeather({
                params: {
                    lat:this.camps.weather.lat,
                    lon:this.camps.weather.lon,
                    exclude:'minutely,alerts',
                    lang:'kr',
                    units:'metric',
                    appid:process.env.VUE_APP_WEATHER_KEY
                }
            })
            // console.log(getWeatherData.data)
            // 현재 날씨 //
            //온도
            this.weather.main.temp = Math.round(getWeatherData.data.current.temp)

            //날씨 상세정보
            this.weather.icon = 'http://openweathermap.org/img/wn/'+getWeatherData.data.current.weather[0].icon+'@2x.png'
            this.weather.description = getWeatherData.data.current.weather[0].description

            //풍속
            // this.wind = getWeatherData.data.wind
            this.wind.speed = Math.round(getWeatherData.data.current.wind_speed)

            //구름
            this.clouds = getWeatherData.data.current.clouds

            //날짜
            this.weekTime = moment(getWeatherData.data.current.dt,"X").lang("ko").format('dddd HH:mm')

            //주간 날씨
            const daily = []
            getWeatherData.data.daily.forEach( function(val, key) {
                if(key==0) return

                daily.push({
                        day:moment(val.dt,"X").lang("ko").format('dd MM.DD'),
                        icon:'http://openweathermap.org/img/wn/'+val.weather[0].icon+'@2x.png',
                        temp_max:Math.round(val.temp.max),
                        temp_min:Math.round(val.temp.min)
                    })
            })
            this.daily = daily


            //시간대별 날씨
            const hourly = []
            getWeatherData.data.hourly.forEach( function(val, key) {
                if(key==0 || key>7) return
                let hour = moment(val.dt,"X").lang("ko").format('HH시')

                hourly.push({
                    // hour:(hour == '00') ?  moment(val.dt,"X").lang("ko").format('MM.DD HH시'): hour+'시',
                    hour:hour,
                    icon:'http://openweathermap.org/img/wn/'+val.weather[0].icon+'@2x.png',
                    temp:Math.round(val.temp)
                })
            })
            this.hourly = hourly

        },
        copy() {
            let textToCopy = this.$refs.textToCopy.$el.querySelector('input')
            textToCopy.select();
            document.execCommand("copy");
        },
    }
}
</script>
<style lang="css">
.custom7cols{
    width: 14%;
    max-width: 14%;
    flex-basis: 14%;
}
</style>
