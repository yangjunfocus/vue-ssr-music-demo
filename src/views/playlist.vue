<template>
<div class="playlist-demo">
   
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'playlist',
    data() {
        return {}
    },
    asyncData({store,route}) {
        return store.dispatch('actionNewMusic')
    },
    computed: {
        ...mapGetters({
            result2: 'getNewest_Music'
        })
    },
    created(){
        console.log(this.result2)
    },
    title() {
        return 'test2'
    },
    methods: {

    }
}
</script>
<style lang="stylus">
.title
    font-weight bold
.summary
    text-indent 35px
    text-align justify
    color #999
</style>
