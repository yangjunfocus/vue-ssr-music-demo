<template>
<div class="test3-demo">
   
</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'test',
    asyncData({ store, route}){
        return store.dispatch('actionTest')
    },
    computed: {
       
    },
    data() {
        return {
            
        }
    },
    title() {
        return 'test3'
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
