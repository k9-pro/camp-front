<template>
<!--    <v-row justify="center">-->

        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="error"
                    dark
                    v-bind="[attrs,btn_size]"
                    v-on="on"
                    class="ml-1"
                >
                    삭제
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                    삭제 하시겠습니까?
                </v-card-title>
                <v-card-text>삭제후 데이터는 복구할수 없습니다.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        취소
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="delClick"
                    >
                        삭제
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

<!--    </v-row>-->
</template>

<script>
export default {
    name: "DeleteModal",
    props:[
        'btn_size',
    ],
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        delClick() {
            this.$emit('delete');
        }
    }
}
</script>

<style scoped>

</style>
