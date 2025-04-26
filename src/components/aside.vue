<template>
    <el-menu
        
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <p class="logo">首页</p> 
        <Tsmenu :MenuData="MenuData" :index='1' />
      </el-menu>
</template>

<script setup>import Tsmenu from '@/components/ssMenu.vue';
import {useRouter}from 'vue-router'
import { reactive,computed } from 'vue'
import { useStore } from 'vuex'

const router = useRouter()
const MenuData = reactive(router.options.routes[0].children)
const store = useStore()

const isCollapse = computed(() => {
    return store.state.menu.isCollapse
})


const handleOpen = (key, keyPath) => {
    
}
const handleClose = (key, keyPath) => {
    
}
</script>

<style lang="less" scoped>
.aside-container{
    height: 100%;
    .logo{
        font-size: 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
}
</style>