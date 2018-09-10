<template>
<div class="index-demo">
    <el-tabs class="tab-head" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="推荐音乐" name="first"></el-tab-pane>
        <el-tab-pane label="热歌榜" name="second"></el-tab-pane>
        <el-tab-pane label="搜索" name="third"></el-tab-pane>
    </el-tabs>
    <div v-if="activeName=='first'" class="c-tab">
        <h2 class="reco-title">推荐歌单</h2>
        <el-row>
            <el-col v-for="(item,index) of SongMenu.result" :key="index" :span="8">
                <router-link class="song-col" :to="{name:'playlist',params:{id:item.id}}">
                    <img :src="item.picUrl" alt="item.name">    
                    <i class="iconfont icon-yinle headset"></i>
                    <span class="list-num">{{item.playCount | myriad}}</span>
                    <p class="desc_text">{{item.name}}</p>
                </router-link>
            </el-col>
        </el-row>
        <h2 class="reco-title">最新音乐</h2>
        <div class="newest-song">
            <router-link v-for="(item,index) of NewMusic.result" :key="index" class="song-col" :to="{path:'/song/'+item.id}">
                <div class="song-inner">
                    <div class="song-name">
                        <div class="txt">{{item.name}}</div>
                        <div class="abstract txt">
                            <span v-for="c of item.song.artists" :key="c.id">{{c.name}} </span> - {{item.name}}
                        </div>
                    </div>
                    <div class="song-icon-wrap">
                        <i class="iconfont icon-play_icon"></i>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
    <div v-if="activeName=='second'" class="c-tab">
        <div class="newest-song">
            <router-link :to="{path:'/song/'+item.id}" v-for="(item,index) of HotSongTop.playlist.tracks" v-if="index<20" :key="index" class="song-col">
                <div :class="{ranking:true,front:index<3}">{{index+1 | fill}}</div>
                <div class="song-inner">
                    <div class="song-name">
                        <div class="txt">{{item.name}} <span class="alia" v-for="(a,$i) of item.alia" :key="$i">({{a}})</span></div>
                        <div class="abstract txt">
                            <span v-for="(c,i) of item.ar" :key="i">{{c.name}} </span>- {{item.al.name}}
                        </div>
                    </div>
                    <div class="song-icon-wrap">
                        <i class="iconfont icon-play_icon"></i>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
    <div v-if="activeName=='third'" class="c-tab">
        <div class="c-search">
            <div class="sch-ipt">
                <el-input @keyup.enter.native="Search" placeholder="搜索歌曲、歌手、专辑" v-model="key"
                clearable prefix-icon="el-icon-search" autofocus>
                </el-input>
            </div>
            <div class="init-sch">
                <h3 class="title" v-if="ismatch">热门搜索</h3>
                <h3 class="title" v-if="bestMatchList.length>0">最佳匹配</h3>
                <div class="hot-sch-area" v-if="ismatch">
                    <el-tag v-for="(item,index) of hotSch.result.hots" :key="index" @click.native="multimatch(item.first)">{{item.first}}</el-tag>
                </div>
            </div>
            <div v-if="key!=''&& issuggest==true" :a="key!=''&& issuggest==true" class="sch-recommend">
                <h3 class="title">搜索“{{key}}”</h3>
                <ul>
                    <li class="item" v-for="(item,index) of schRes" :key="index">
                        <div class="s-icon"><i class="el-icon-search"></i></div>
                        <div class="name" @click="multimatch(item.name)">
                            <p class="txt">{{item.name}}</p>
                            <div class="abstract txt"><span>{{item.artists | singerName}}</span></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="!ismatch" class="matched-sch">
                <ul>
                    <li class="match-item" v-if="bestMatch.album">
                        <router-link to="/" v-for="(item,index) of bestMatch.album" :key="index">
                            <div class="match-inner">
                                <div class="img-wrap">
                                    <img :src="item.picUrl">
                                </div>
                                <div class="desc">
                                    <h3 class="txt">专辑:<span>{{item.name}}</span></h3>
                                    <p class="tname" v-for="c of item.artists" :key="c.id">{{c.name}}</p>
                                </div>
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </router-link>
                    </li>
                    <li class="match-item" v-if="bestMatch.artist">
                        <router-link to="/" v-for="(item,index) of bestMatch.artist" :key="index">
                            <div class="match-inner">
                                <div class="img-wrap">
                                    <img :src="item.picUrl" alt="">
                                </div>
                                <div class="desc">
                                    <h3 class="txt">歌手:<span>{{item.name}} <span v-for="a of item.alias" :key="a">({{a}})</span></span></h3>
                                </div>
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </router-link>
                    </li>
                    <li class="match-item" v-if="bestMatch.mv">
                        <router-link to="/" v-for="(item,index) of bestMatch.mv" :key="index">
                            <div class="match-inner">
                                <div class="img-wrap">   
                                    <img class="mv" :src="item.cover" alt="">
                                    <i class="iconfont icon-play_icon"></i>
                                </div>
                                <div class="desc">
                                    <h3 class="txt">MV:<span>{{item.name}} <span v-for="a of item.alias" :key="a">({{a}})</span></span></h3>
                                    <p class="tname">{{item.artistName}}</p>
                                </div>
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </router-link>
                    </li>
                </ul>
                 <div class="newest-song">
                    <router-link :to="{path:'/song/'+item.id}" v-for="(item,index) of bestMatchList" :key="index" class="song-col">
                        <div class="song-inner">
                            <div class="song-name">
                                <div class="txt">{{item.name}} <span class="alia" v-for="(a,$i) of item.alias" :key="$i">({{a}})</span></div>
                                <div class="abstract txt">
                                    <span>{{item.artists | singerName}} </span>-<span> {{item.album.name}}</span>
                                </div>
                            </div>
                            <div class="song-icon-wrap">
                                <i class="iconfont icon-play_icon"></i>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="sch-history" v-if="ismatch">
                <ul>
                    <li class="history-item" v-for="(h,index) of history" :key="index">
                        <div style="margin: 0 10px;">
                            <i class="icons el-icon-time"></i>
                        </div>
                        <div class="sch-name">
                            <span @click="multimatch(h)" class="txt">{{h}}</span>
                            <i @click="deleteHistory(h)" class="icons el-icon-close"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>  
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'index',
    asyncData({ store, route}){
        const { dispatch } = store
        return Promise.all([
            dispatch('actionRecomSongMenu'),
            dispatch('actionNewMusic')
        ])
    },
    computed: {
        ...mapGetters({
            SongMenu:'getRecom_Song_Menu',
            NewMusic:'getNewest_Music'
        })
    },
    data() {
        return {
            activeName: 'first',
            ismatch:true,
            issuggest:true,
            HotSongTop:{
                playlist:{}
            },
            flag:true,
            isSch:true,
            hotSch:{
                result:[]
            },
            history:[],
            bestMatchList:[],
            bestMatch:{},
            key:'',
            schRes:[]
        }
    },
    title() {
        return 'index'
    },
    mounted(){
        this.history=(localStorage.getItem('sch_HISTORY')?localStorage.getItem('sch_HISTORY').split(','):[])
    },
    created(){
    },
    watch:{
        key(val){
            this.ismatch=false;
            if(this.bestMatchList.length>0){
                this.issuggest=true;
            }
            if(val===''){
                this.ismatch=true;
                this.bestMatchList.length=0
                this.bestMatch={}
                return;
            }
            if(this.issuggest==true){
                this.$http.get(`http://localhost:3000/search/suggest/keyword?keywords=${val}`).then((res)=>{
                    if(res.statusText === 'OK'){
                        this.schRes=res.data.result.songs
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    },
    methods: {
        Search($event){
            if(this.key!=''){
                this.multimatch(this.key)
            }
        },
        multimatch(key){
            this.key=key;
            this.issuggest=false;
            this.$http.get(`http://localhost:3000/search/multimatch?keywords=${key}`).then((res)=>{
                if(res.statusText === 'OK'){
                    this.bestMatch=res.data.result
                }
            }).catch((err)=>{
                console.log(err)
            })

            this.$http.get(`http://localhost:3000/search/get?keywords=${key}`).then((res)=>{
                if(res.statusText === 'OK'){
                    this.bestMatchList=res.data.result.songs
                }
            }).catch((err)=>{
                console.log(err)
            })
            const index=this.history.findIndex((item)=>{
                return item === this.key
            })
            if(index<0){
                this.history.push(key)
            }
            
            localStorage.setItem('sch_HISTORY',this.history)
        },
        deleteHistory(h){
            this.history.forEach((element,i) => {
                if(element==h){
                    this.history.splice(i,1)
                }
            });
            localStorage.setItem('sch_HISTORY',this.history)
        },
        handleClick(tab, event) {
           if(this.activeName=='second' && this.flag){
               this.$store.dispatch('actionHotTop').then(()=>{
                    this.flag=false;
                    this.HotSongTop = Object.assign({}, this.$store.getters.getHot_Music_List);
               })
           }else if(this.activeName=='third' && this.isSch){
               this.$http.get('http://localhost:3000/search/hot').then((res)=>{
                   if(res.statusText === 'OK'){
                       this.hotSch=res.data
                   }
               }).catch((err)=>{
                   console.log(err)
               })
           }
        }
    }
}
</script>

<style lang="stylus">
    .tab-head
        position fixed
        top 0
        left 0
        width 100%
        z-index 33
        background #fff
    .index-demo
        /deep/ .el-tabs__header
            margin-bottom 0
        /deep/ .el-tabs__nav 
            width 100%
            text-align center
        /deep/ .el-tabs__item
            width 33.3%
        .c-tab
            padding-top 60px
            .el-col
                padding:0 1px 20px 0
                height 180px
            .el-col:last-child
                padding-right: 0
            .reco-title
                position relative
                padding-left 9px
                margin-bottom 14px
                font-size 17px
                height 20px
                line-height 20px
                &:before
                    content " "
                    position absolute
                    left 0
                    top 50%
                    margin-top -9px
                    width 2px
                    height 16px
                    background-color #d33a31
        .song-col
            position relative
            display block
            width 100%
            &>img
                width 100%
            .list-num
                position absolute 
                right 5px
                top 2px
                color #fff
                font-size 12px
            .desc_text
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                overflow hidden
                padding 6px 3px 0 6px
                line-height 1.2
                font-size 13px
    .newest-song
        .song-col
            padding 0 10px
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
    .song-icon-wrap
        i
            font-size 25px
            color #888
    .ranking
        width 28px
        color #999
    .front
        color #df3436
    .headset
        position absolute 
        right 40px
        top 2px
        color #eee
    .alia
        color #888
    .sch-ipt
        padding 0 10px 15px
        border-bottom 1px solid #f5f5f5
    .init-sch
        padding 15px 10px 0
        .title
            font-size 12px
            line-height 12px
            color #666
        .hot-sch-area
            margin 10px 0 7px
            span 
                margin-right 8px
                margin-bottom 10px
                cursor pointer
    .sch-recommend
        padding 0 10px
        .title
            height 50px
            padding 0 10px
            font-size 15px
            line-height 50px
            color #507daf
            border-bottom 1px solid #f5f5f5
        .item
            display -webkit-box
            display -webkit-flex
            display flex
            -webkit-box-align center
            -webkit-align-items center
            align-items center
            height 47px
        .s-icon
            -webkit-box-flex 0
            -webkit-flex 0 0 auto
            flex 0 0 auto
            margin-right 7px
            i
                color #888
        .name
            width 1%
            -webkit-box-flex: 1
            -webkit-flex: 1
            flex: 1
            padding 5px 10px 5px 0
            font-size 15px
            color #333  
            border-bottom 1px solid #f5f5f5    

    .match-item
        a
            display block
        .match-inner
            display -webkit-box
            display -webkit-flex
            display flex
            -webkit-box-align center
            -webkit-align-items center
            align-items center
            height 66px
            margin-left 10px
            padding 8px 10px 8px 0
            border-bottom 1px solid #f5f5f5
            .img-wrap
                margin-right 15px
                position relative
                .iconfont
                    position absolute
                    left 50%
                    top 50%
                    -webkit-transform translate(-50%,-50%)
                    transform translate(-50%,-50%)
                    color #fff
            img 
                height 50px
                width 50px
            .mv
                width 89px
                height 50px
            .desc
                -webkit-box-flex 1
                -webkit-flex 1
                flex 1
                display inline-block
                width 1%
                .tname
                    font-size 12px
                    color #999
                    line-height 30px
    .sch-history
        .history-item,.sch-name
            display -webkit-box
            display -webkit-flex
            display flex
            -webkit-box-align center
            -webkit-align-items center
            align-items center
            height 45px
        .sch-name,.sch-name span
            -webkit-box-flex 1
            -webkit-flex 1
            flex 1
            width 1%
        .sch-name
            border-bottom 1px solid #f5f5f5 
            
        .sch-name span+i
            width 32px
        .icons
                color #666
</style>
