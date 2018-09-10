<template>
<div class="test-demo">
    <p class="index">this is index</p>
    <button>get window</button>
    <div class="result-wrap">
        <p>author: {{result.author}}</p>
        <p>title: {{result.alt_title}}</p>
        <p>author intro: {{result.author_intro}}</p>
        <dl>
            <dt>catalog:</dt>
            <dd>{{result.catalog}}</dd>
        </dl>
        <img :src="result.image" alt="">
    </div>
</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'test',
    asyncData({ store, route}){
        const { dispatch } = store
        // function req1() {
        //     store.dispatch('actionBookInfo')
        // }
        // function req2() {
        //     store.dispatch('actionTest')
        // }
        return Promise.all([
            // dispatch('actionBookInfo'),
            dispatch('actionTest')
        ])
    },
    computed: {
        ...mapGetters({
            result: 'getBookInfo'
        })
    },
    data() {
        return {
            
        }
    },
    title() {
        return 'index'
    },
    created(){
        
    },
    methods: {
    }
}
</script>

<style lang="stylus">
.index
    color #00936f
    font-size 16px
    font-font-weight bold
</style>
