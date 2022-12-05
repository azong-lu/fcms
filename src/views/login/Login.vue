<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormRules, FormInstance } from 'element-plus'
import { useUsersStore } from '@/store/user/user'

const userStore = useUsersStore()

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,18}$/,
      message: '账号必须是5~18个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,18}$/,
      message: '密码必须是5~10个字母或者数字',
      trigger: 'blur'
    }
  ]
})

const form = reactive({
  account: '',
  password: ''
})
const formRef = ref<FormInstance>()

const handleSubmit = () => {
  formRef.value?.validate(async (res) => {
    if (res) {
      userStore.getTokenAction({ ...form })
    }
  })
}
</script>

<template>
  <div class="login-wrapper">
    <el-card shadow="hover" class="el-card-wrapper">
      <template #header>
        <div class="card-header">后台管理系统模板</div>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="left">
        <el-form-item label="账号：" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.login-wrapper {
  background: url('@/assets/login_bg.jpg') no-repeat;
  width: 100%;
  height: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .card-header {
    text-align: center;
    font-weight: bold;
    font-size: 1.3889rem;
  }
  .el-card-wrapper {
    border-radius: 1.5117rem;
    width: 34.7222rem;
    background: rgba(255, 255, 255, 0.8);
    .el-button {
      flex: 1;
      height: 2.7778rem;
    }
  }
}
</style>
