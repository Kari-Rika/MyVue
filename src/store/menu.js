const state={
    isCollapse:false,
    selectMenu:[]
}
const mutations={
    // 侧边栏收缩
    collapseMenu(state){
        state.isCollapse=!state.isCollapse
    },
    // tab选中
    addmenu(state,payload){
        // 对数据进行处理
        if(state.selectMenu.findIndex(item=>item.path===payload.path)===-1){
            state.selectMenu.push(payload)
        }
    },
    closeMenu(state,payload){
        // 找到当前选中的菜单索引
        const index=state.selectMenu.findIndex(val=>val.name===payload.name)
        // 通过索引删除指定的菜单
        state.selectMenu.splice(index,1)
    }    
}
export default {
    state,
    mutations
}