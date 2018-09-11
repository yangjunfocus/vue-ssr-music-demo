<template>
<div class="playlist-demo">
   <div class="playlist-head">
       <div class="head-bg" :style="{ backgroundImage:'url('+ PlayList.playlist.coverImgUrl+')'}"></div>
       <div class="head-main">
           <div class="playlist-intro-other">
               <img :src="PlayList.playlist.coverImgUrl">
               <span class="playlist-txt-sm">歌单</span>
               <p class="headset">
                    <i class="iconfont icon-yinle"></i>
                    <span class="list-num">{{PlayList.playlist.playCount | myriad}}</span>
                </p>
           </div>
           <div class="playlist-info">
               <h2 class="title txt-hide">{{PlayList.playlist.name}}</h2>
               <div>
                   <router-link class="user-link txt-hide" to="/">
                        <div class="avatar-wrap">
                            <img :src="PlayList.playlist.creator.avatarUrl" alt="">
                        </div>{{PlayList.playlist.creator.nickname}}
                   </router-link>
               </div>
           </div>
       </div>
   </div>
   <div class="playlist-detail">
       <div class="mark-tags">
           标签：<el-tag v-for="(t,index) of PlayList.playlist.tags" :key="index" type="info">{{t}}</el-tag>
       </div>
       <div class="play-intro">
           <div :class="{'txt-hide':down,'txt-hide3':down}">
               {{PlayList.playlist.description}}
           </div>
           <span @click="down=!down;" :class="{arrow:true,'el-icon-arrow-down':down,'el-icon-arrow-up':!down}"></span>
       </div>
   </div>
   <div class="playlist-list">
       <h3 class="c-title">歌曲列表</h3>
       <div class="newest-song">
            <div v-for="(item,index) of PlayList.playlist.tracks" :key="item.id" class="song-col">
                <div class="ranking">{{index+1}}</div>
                <div class="song-inner">
                    <div class="song-name">
                        <div class="txt">{{item.name}} <span v-for="(a,i) of item.alia" :key="i" class="alia">({{a}})</span></div>
                        <div class="abstract txt">
                            <span>{{item.ar | singerName}} </span>-<span> {{item.al.name}}</span>
                        </div>
                    </div>
                    <div class="song-icon-wrap">
                        <i class="iconfont icon-play_icon"></i>
                    </div>
                </div>
            </div>
        </div>
   </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'playlist',
    data() {
        return {
            down:true
        }
    },
    asyncData({store,route}) {
        return store.dispatch('actionPlaylistDetail',route.params.id)
    },
    computed: {
        ...mapGetters({
            PlayList:'getPlaylist_Detail'
        })
    },
    created(){
    },
    title() {
        return this.PlayList.playlist.name
    },
    methods: {
    }
}
</script>
<style lang="stylus">
    .playlist-head
        position relative
        padding 30px 10px 30px 15px
        overflow hidden
    .head-bg
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        z-index 1
        background-repeat no-repeat
        background-size cover
        background-position 50%
        -webkit-filter blur(20px)
        filter blur(20px)
        -webkit-transform scale(1.5)
        transform scale(1.5)
    .head-main
        display -webkit-box
        display -webkit-flex
        display flex
        position relative
        z-index 2
    .playlist-intro-other
        position relative
        width 126px
        height 126px
        img 
            width 100%
            vertical-align middle
        .playlist-txt-sm
            position absolute
            z-index 3
            top 10px
            left 0
            padding 0 8px
            height 17px
            color #fff
            font-size 9px
            text-align center
            line-height 17px
            background-color rgba(217,48,48,.8)
            border-top-right-radius 17px
            border-bottom-right-radius 17px
    .txt-hide
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
    .txt-hide3
        -webkit-line-clamp 3
    .headset
        position absolute 
        text-align right
        width 100%
        top 0
        color #eee
        right 4px
        i
            display inline-block
            vertical-align middle
        .list-num
            color #fff
            margin-left 2px
            font-size 12px
    .playlist-info
        -webkit-box-flex 1
        -webkit-flex 1 1 auto
        flex 1 1 auto
        width 1%
        margin-left 16px
        .title
            padding-top 1px
            font-size 17px
            line-height 1.3
            color #fefefe
            height 44px
            display -webkit-box
            -webkit-box-pack center
            margin-bottom 20px 
        .user-link
            display inline-block
            font-size 14px
            color #fff 
        .avatar-wrap
            display inline-block
            width 30px
            height 30px
            border-radius 50%
            vertical-align middle
            margin-right 5px
            img
                -webkit-border-radius 50%
                border-radius 50%
                width 100%
                vertical-align middle
    .playlist-detail
        padding 10px
        font-size 14px
    .mark-tags
        line-height 20px
        margin-bottom 10px
        color #666
        span 
            margin-right 10px
            padding 0 4px
            line-height 19px
            height 19px
    .play-intro
        position relative
        padding-bottom 18px
        line-height 19px
        color #666
    .playlist-list
        .c-title
            height 23px
            line-height 23px
            padding 0 10px
            font-size 12px
            color #666
            background-color #eeeff0 

    .playlist-list .newest-song
        .song-col
            padding 0 10px 0 0
            display -webkit-box
            display -webkit-flex
            display flex
            -webkit-box-align center
            -webkit-align-items center
            align-items center
            .song-inner
                border-bottom 1px solid #f5f5f5
                display -webkit-box
                display -webkit-flex
                display flex
                -webkit-box-flex 1
                -webkit-flex 1 1 auto
                flex 1 1 auto
                justify-content space-between
                -webkit-justify-content space-between
                -webkit-box-align center
                -webkit-align-items center
                align-items center
        .song-name
            padding 6px 0    
            -webkit-box-flex 1
            -webkit-flex 1 1 auto
            flex 1 1 auto
            width 0    
    .txt
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        word-break normal    
        font-size 17px
    .abstract
        color #888
        font-size 12px
    .playlist-list .ranking
        width 40px
        color #999
        text-align center
    .song-icon-wrap
        i
            font-size 25px
            color #888
    .arrow
        position: absolute
        bottom: 3px
        right: 0
        z-index: 3
        width: 15px
        height: 15px
</style>
