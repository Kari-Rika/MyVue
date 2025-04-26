<template>
    <!-- <div>header</div> -->
    <div class="navg">
        <div class="ha-left flex-center">
            <el-icon class="icon" @click="store.commit('collapseMenu')" size="20">
                <Fold />
            </el-icon>
            <ul class="flex-center">
                <li v-for="(item, index) in selectMenu" :key="index"
                :class="{sleected:route.path === item.path}"
                 class="tab flex-center">
                    <el-icon class="" size="12">
                        <component :is="item.icon" />
                    </el-icon>
                    <router-link class="text flex-center" :to="item.path">{{ item.name }}</router-link>
                    <el-icon class="close" size="12" @click="closeTab(item,index)"><Close /></el-icon>
                </li>
            </ul>
        </div>
        <div class="ha-right">
            <el-dropdown>
                <div class="el-dropdown-link flex-center">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <p class="user-name">admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// 获取store实例
const store = useStore()
// 当前路由对象
const route = useRoute()
const router = useRouter()
const selectMenu = computed(()=>store.state.menu.selectMenu)
// 关闭tab
const closeTab = (item, index) => {
    store.commit('closeMenu', item); // 更新状态，关闭对应菜单

    // 如果当前关闭的选项卡不是选中状态，则直接返回
    if (route.path !== item.path) {
        return;
    }

    const selectMenuData = selectMenu.value;

    // 关闭选项卡后，没有项卡则导航到主页
    if (selectMenuData.length === 0) {
        router.push('/'); // 导航到首页
    } else {
        // 判断下一个要导航到的选项卡
        const nextIndex = (index === 0) ? 0 : index - 1; // 默认指向前一个
        router.push(selectMenuData[nextIndex].path); // 切换路由
    }
};
</script>

<style lang="less" scoped>
.flex-center {
    display: flex;
    align-items: center;
    height: 100%;
}

.navg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;

    .ha-left {
        height: 100%;
        .icon {
            width: 45px;
            height: 100%;
        }

        .icon:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }
        .tab {
            padding: 0 10px;
            height: 100%;
            color: #000000;
            .text {
                color: #000;
                margin: 0 5px;
                line-height: 100%;
            }
            .close{
                visibility: hidden;
            }
            &.sleected {
                a{
                    color: #409eff;
                }
                i{
                    color: #409eff;
                }
                background: #f5f5f5;
            }
        }
        .tab:hover {
            background-color: #f5f5f5;
            .close {
                visibility: inherit;
                cursor: pointer;
                color: #000;
            }
        }


    }
    .ha-right {
        .user-name {
            margin: 10px;
        }
    }
}
</style>