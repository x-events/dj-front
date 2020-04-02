<template>
    <el-col :span="span" class="upload-div flex-row">
        <div class="flex-1 list-center" v-if="dataL.length > 0">
            <swiper :options="swiperOption" class="avatar-uploader flex-col">
                <swiper-slide v-for="(e,i) in dataL" :key="i">
                    <!-- <div class="meminfo flex-row">
                        <div class="flex-1">
                            <div class="face flex-1"><img :src="e"></div>
                        </div>
                    </div> -->
                    <div class="face flex-1"><img :src="e[field.url]">
                        <div class="mask-text" v-if="isText">{{e[field.text]}}</div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="swiper-button-prev" :class="'swiper-button-prev'+numIndex" v-if="dataL.length > 0"></div>
        <div class="swiper-button-next" :class="'swiper-button-next'+numIndex" v-if="dataL.length > 0"></div>
        <div class="flex-1" v-else>
            <div class="flex-1" style="padding: 0 30px;" >
                <swiper :options="swiperOption" class="avatar-uploader flex-col tc">
                    <span class="sblock nopic">暂无图片</span>
                </swiper>
            </div>
        </div>
    </el-col>
</template>

<script>

export default {
    props: {
        data: {
            type: Array,
            default: []
        },
        span: {
            type: Number,
            default:()=> {
                return 12
            }
        },
        field: {
            type: Object,
            default:()=> {
                return {
                    url: 'url',
                    text: 'text'
                }
            }
        },
        slidesPerView: {
            type: [Number, String],
            default: 3
        },
        numIndex: {
            type: [Number, String],
            default: 0
        },
        isText: {
            type: Boolean,
            default: false
        },
        isLoop: {
            type: Boolean,
            default: false
        },
        isAutoplay: {
            type: Boolean,
            default: false
        },
        speed: {
            type: Number,
            default: 600
        },
    },
    data() {
        return {
            dataL: this.data,
            swiperOption: {
                slidesPerView:this.slidesPerView,
                slidesPerGroup:this.slidesPerView,
                spaceBetween: 10,
                speed: this.speed,
                autoplay: this.isAutoplay,
                loop: this.isLoop,        // 是否循环
                loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: '.swiper-button-next'+this.numIndex,
                    prevEl: '.swiper-button-prev'+this.numIndex,
                },
            },
        };
    },
    watch: {
        data(val) {
            this.dataL = val || []
        }
    },
    methods: {
        // 上传成功
        uploadSuccess(res, file, fileList) {
            this.imgUrl = res.data.url
            this.$emit('on-Success', res);
        }
    }
};
</script>

<style scoped>
.upload-div .list-center { padding: 0 30px; }
.upload-div .list-center .face { height: 100%; position: relative; }
.upload-div .list-center .face img { padding: 20px 0; box-sizing: border-box; max-height: 100%; position: absolute; left: 0;right: 0; bottom: 0; top: 0;margin: auto; }
.upload-div .list-center .face .mask-text { position: absolute; height: 50px; line-height: 50px; bottom: 0; left: 0;right: 0;margin: auto; background: rgba(0,0,0,0.5); text-align: center; color: #fff; }
.swiper-container.avatar-uploader { line-height: 203px; height: 203px; cursor: default; }
.swiper-container .swiper-wrapper { text-align: center;}
.swiper-container .swiper-wrapper .sblock { width: 100%;}
.nopic { display:block; text-align:center;}
.swiper-button-prev, .swiper-button-next { width: 20px; height: 40px; background-size: 20px 40px; outline: none; }
</style>
