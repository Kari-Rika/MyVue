<template>
    <template v-for="(item, index) in props.MenuData">
        <el-menu-item 
        @click="puClick(item,`${props.index}-${item.meta.id}`)"
        v-if="!item.children || item.children.length == 0"
         :index="`${props.index}-${item.meta.id}`"
            :key="`${props.index}-${item.meta.id}`">
            <el-icon size="20">
                <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
            <template #title>
                <el-icon size="20">
                <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.name }}</span>
            </template>
            <ss-menu :index="`${props.index}-${item.meta.id}`" :MenuData="item.children" />
        </el-sub-menu>
    </template>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const props = defineProps({
  MenuData: {
    type: Array,
    required: true
  },
  index: {
    type: String,
    required: true
  }
})

const router = useRouter()
const store = useStore()
// 点击菜单
const puClick = (item, active) => {
    console.log(item.meta);
    store.commit('addmenu',item.meta)
    router.push(item.meta.path)
    // console.log(store.state.menu.selectMenu);
}

</script>

<style scoped></style>