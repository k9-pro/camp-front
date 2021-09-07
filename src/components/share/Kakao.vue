<template>
  <v-card>
    <v-card-title>
      <span>공유하기</span>
      <v-spacer />
      <a
        class="kakao"
        @click="sendkakao"
      > <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"> </a>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
    name: 'KakaoShare',
    methods: {
        sendkakao: function () {
            Kakao.init('35c14a1a63e7b3e396e2cc0fe1042ec2');
            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: '캠핑장 공유',
                    description: '좋은 야영장 공유 합니다.',
                    imageUrl: '',
                    link: {
                        mobileWebUrl: 'http://localhost:8080',
                        webUrl: 'http://localhost:8080',
                    },
                },
                buttons: [
                    {
                        title: '웹으로 보기',
                        link: {
                            mobileWebUrl: 'http://localhost:8080',
                            webUrl: 'http://localhost:8080',
                        },
                    },
                ],
            })
        }
    },
    head() {
        return {
            script: [
                {
                    src: '//developers.kakao.com/sdk/js/kakao.min.js'
                },
            ],
        }
    },
};
</script>
