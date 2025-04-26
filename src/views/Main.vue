<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <el-header class="el-header">
        <Header />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from '@/components/aside.vue'
import Header from '@/components/nav.vue'
</script>

<style lang="less" scoped>
.common-layout {
  height: 100vh;

  .el-container {
    height: 100%;
    .el-header {
      padding: 0;
    }
  }
}
</style>