<template>
    <div class="wave-background">
        <div class="wave layer1"></div>
        <div class="wave layer2"></div>
        <div class="wave layer3"></div>
        <el-row class="login-box" justify="center" :align="center">
            <el-card class="login-card" :style="{ height: cardHeight }">
                <template #header>
                    <div class="card-header">
                        <img :src="imgUrl" alt="Header image">
                    </div>
                </template>

                <div class="jump-link">
                    <el-link type="primary" @click="AddUser">
                        {{ LinkText ? '去注册' : '已有账号' }}
                    </el-link>
                </div>

                <el-form :model="loginForm" style="max-width: 480px;">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="手机号" :prefix-icon="UserFilled"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="密码"
                            :prefix-icon="Lock"></el-input>
                    </el-form-item>

                    <transition name="slide">
                        <el-form-item v-if="!LinkText" prop="xcode" key="code">
                            <el-input v-model="loginForm.xcode" placeholder="验证码">
                                <template #append>
                                    <el-button @click="getCode" type="primary" :disabled="isButtonDisabled" size="small"
                                        style="min-width: 93.3px;">
                                        {{ nums.codeText }}
                                    </el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                    </transition>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;" @click="">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>
    </div>
</template>

<script setup>
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
const phone = /^1(3[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
const imgUrl = new URL('@/assets/flow.png', import.meta.url).href;
const loginForm = ref({
    username: '',
    password: '',
    xcode: ''
});
const LinkText = ref(true);
const cardHeight = ref('auto');

// 控制按钮是否禁用
const isButtonDisabled = ref(false);

const AddUser = () => {
    LinkText.value = !LinkText.value; // 切换 LinkText
    updateCardHeight();
};

// 计算 el-card 的高度
const updateCardHeight = () => {
    cardHeight.value = LinkText.value ? '400px' : '450px'; // 假设不同状态下的高度
};

// 验证码模块
const nums = reactive({
    codeText: '获取验证码',
    time: 60
});
const getCode = () => {
    console.log(loginForm.value.username);
    
    if (!loginForm.value.username || !phone.test(loginForm.value.username)) {
        return ElMessage({
            message: '请输入正确的手机号',
            type: 'error',
            plain: true,
        })
    }
    if (isButtonDisabled.value) return; // 如果按钮已禁用，直接返回

    console.log('获取验证码');
    nums.time = 60; // 重置时间
    isButtonDisabled.value = true; // 禁用按钮
    nums.codeText = '剩余' + nums.time + '秒'; // 更新按钮文本

    const timer = setInterval(() => {
        nums.time--;
        nums.codeText = '剩余' + nums.time + '秒';

        if (nums.time === 0) {
            clearInterval(timer);
            nums.codeText = '获取验证码'; // 更新按钮文本
            isButtonDisabled.value = false; // 启用按钮
        }
    }, 1000);
};

// 初始化卡片高度
updateCardHeight();
</script>

<style lang="less" scoped>
.wave-background {
    position: relative;
    overflow: hidden;
    /* 隐藏溢出部分 */
    height: 100vh;
    /* 高度为视口高度 */
    background: linear-gradient(to top, lightblue 60%, #ffffff);
    /* 渐变背景 */
}

/* 波浪样式 */
.wave {
    position: absolute;
    bottom: -20px;
    /* 波浪底部位置 */
    left: 50%;
    /* 初始平移 */
    width: 200%;
    /* 宽度覆盖 */
    height: 100px;
    /* 波浪高度 */
    background: rgba(255, 255, 255, 0.5);
    /* 波浪颜色 */
    border-radius: 50%;
    /* 圆角形成波浪 */
    transform: translateX(-50%);
    /* 水平居中 */
}

.layer1 {
    animation: wave-animation 8s linear infinite;
    /* 第一层动画 */
}

.layer2 {
    animation: wave-animation 6s linear infinite;
    /* 第二层动画 */
    opacity: 0.7;
    /* 使用不同透明度 */
    bottom: -30px;
    /* 调整位置 */
}

.layer3 {
    animation: wave-animation 4s linear infinite;
    /* 第三层动画 */
    opacity: 0.5;
    /* 使用不同透明度 */
}

/* 定义波浪动画 */
@keyframes wave-animation {
    0% {
        transform: translateX(-50%) translateY(0);
        /* 初始位置 */
    }

    50% {
        transform: translateX(-50%) translateY(-20px);
        /* 向上抬高 */
    }

    100% {
        transform: translateX(-50%) translateY(0);
        /* 回到初始位置 */
    }
}

.login-box {
    min-height: 100vh;
    /* 让.container的高度至少为100vh */
    display: flex;
    /* 使用Flexbox实现居中 */
    flex-direction: column;
    /* 垂直从上到下排列 */
    justify-content: center;
    /* 在垂直方向上居中 */
    align-items: center;
}

.login-card {
    background: rgba(255, 255, 255, 0.9);
    /* 白色卡片，略带透明 */
    border-radius: 20px;
    /* 圆角 */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    /* 轻微阴影 */
    transition: height 0.6s ease;
    /* 添加高度变化的过渡效果 */
    min-width: 332px;
    /* 限制最小宽度 */
    max-width: 480px;
    /* 限制最大宽度 */
}

.card-header {
    background: transparent;
    /* 使用透明背景 */
    display: flex;
    /* 使用 Flexbox */
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 20vh;
    /* 设置高度 */

    img {
        max-width: 100%;
        /* 限制最大宽度 */
        max-height: 100%;
        /* 限制最大高度 */
        object-fit: contain;
        /* 内容适应，不失真 */
    }
}

.jump-link {
    text-align: right;
    margin-bottom: 10px;
}

/* 添加滑动效果 */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
}

.slide-enter-to {
    transform: translateY(0) scale(1);
    opacity: 1;
}

.slide-leave-from {
    transform: translateY(0) scale(1);
    opacity: 1;
}

.slide-leave-to {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
}
</style>