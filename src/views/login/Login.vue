<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormRules, FormInstance } from 'element-plus'
import { useUsersStore } from '@/store/user'

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
const btnLoading = ref<boolean>(false)

const handleSubmit = () => {
  formRef.value?.validate(async (res) => {
    if (res) {
      btnLoading.value = true
      const { code, message: returnMsg } = await userStore.getTokenAction({
        ...form
      })
      btnLoading.value = false
      if (code === 200) {
        await userStore.getUserInfoAction()
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: returnMsg,
          type: 'error'
        })
      }
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
          <el-input
            v-model="form.password"
            placeholder="请输入用户名"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="btnLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/login_bg.jpg') no-repeat;
  background-size: cover;

  .card-header {
    font-weight: bold;
    font-size: 1.3889rem;
    text-align: center;
  }

  .el-card-wrapper {
    width: 34.7222rem;
    background: rgb(255 255 255 / 80%);
    border-radius: 1.5117rem;

    .el-button {
      flex: 1;
      height: 2.7778rem;
    }
  }
}
</style>
