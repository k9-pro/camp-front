<template>
    <v-card class="p-6">
        <ValidationObserver v-slot="{ handleSubmit,invalid }" ref="form">
            <!--                {{invalid}}-->
            <v-form @submit.prevent="handleSubmit(onSubmit)">
                <validation-provider rules="min:3" immediate v-slot="{ errors }">
                    <v-text-field label="제목" v-model="title"></v-text-field>
                    <span>{{ errors[0] }}</span>
                </validation-provider>
                <validation-provider rules="min:30" immediate v-slot="{ errors }">
                    <ckeditor
                        tag-name="textarea"
                        ref="cktext"
                        @blur="onBlur($event)"
                        :editor="editor"
                        v-model="content"
                        :config="editorConfig"
                    ></ckeditor>
                    <span>{{ errors[0] }}</span>
                </validation-provider>
            </v-form>
            <div class="text-center pa-2">
                <v-btn class="" color="primary" type="submit" :disabled="invalid">등록</v-btn>
                <v-btn class="ml-5" @click="clear">초기화</v-btn>
            </div>
        </ValidationObserver>
    </v-card>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import UploadAdapter from '@/components/edit/UploadAdapter';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles';

import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import List from '@ckeditor/ckeditor5-list/src/list';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';




import { ValidationProvider, setInteractionMode, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

//set interaction mode globally
setInteractionMode("eager"); //possible values are Lazy, Passive, Aggressive
extend("required", {
    ...required,
    message: "This field is required"
});

extend("min", {
    validate(value, args) {
        return value.length >= args.length;
    },
    params: ["length"],
    message: "{field} must be, at least, {length} caracters"
});

export default {
    name: "Ckeditor",
    components: {
        ValidationProvider,
        ValidationObserver
    },
    props: {
        msg: String
    },
    data() {
        return {
            title: "",
            content: "",
            editor: ClassicEditor,
            editorConfig: {
                plugins: [
                    EssentialsPlugin,
                    BoldPlugin,
                    ItalicPlugin,
                    LinkPlugin,
                    ParagraphPlugin,
                    Alignment,
                    // EasyImage,
                    Heading,
                    Image,
                    ImageCaption,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    List,
                    BlockQuote,
                    Autoformat,
                    Essentials,
                    UploadAdapter,
                    FontFamily,
                    FontSize,
                    FontColor,
                    FontBackgroundColor,
                    Strikethrough,
                    Underline,
                    ImageResizeEditing,
                    ImageResizeHandles
                ],
                // toolbar: [ 'heading', '|', 'fontfamily', 'fontsize', '|', 'bold', 'italic', 'link', 'bulletedList', 'insertImage', 'numberedList', 'toggleImageCaption', 'imageTextAlternative', 'blockQuote', 'clipboard', 'undo', 'redo' ],
                // The configuration of the editor.
                toolbar: {
                    items: [
                        'heading', '|',
                        'fontfamily', 'fontsize', '|',
                        'alignment', '|',
                        'fontColor', 'fontBackgroundColor', '|',
                        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                        'link', '|',
                        'outdent', 'indent', '|',
                        'bulletedList', 'numberedList', 'todoList', '|',
                        'code', 'codeBlock', '|',
                        'insertTable', '|',
                        'uploadImage', 'blockQuote', '|',
                        'undo', 'redo'
                    ]
                },
                image: {
                    toolbar: [
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        '|',
                        'toggleImageCaption',
                        'imageTextAlternative'
                    ]
                },
                extraPlugins: [
                    this.uploader,
                ],
                // shouldNotGroupWhenFull: true,
                // fillEmptyBlocks: false,
                // basicEntities: false,
                // entities: false,
                // entities_greek: false,
                // entities_latin: false,
                // entities_additional: "",
                language: "ko",

                mediaEmbed: {
                    previewsInData: true
                }
            }
        };
    },
    methods: {
        onSubmit() {
            console.log();
        },
        clear() {
            this.$refs.form.reset();
            this.content = "";
            this.title = "";
        },
        onBlur(e) {
            // when living the ckeditor
        },
        uploader(editor) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                return new UploadAdapter( loader );
            };
        }
    }, //methods
    mounted() {
        //this.$refs.form.validate();
    }
}
</script>

<style scoped>

</style>
