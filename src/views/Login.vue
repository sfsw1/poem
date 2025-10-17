<template>
  <div class="login-register-section">
    <div class="form-container">
      <div class="form-toggle">
        <button @click="isLogin = true" :class="{ active: isLogin }">登录</button>
        <button @click="isLogin = false" :class="{ active: !isLogin }">注册</button>
      </div>

      <!-- 登录表单 -->
      <form v-if="isLogin" class="auth-form" @submit.prevent="handleLogin">
        <h2>欢迎回来</h2>
        <div class="input-group">
          <label for="login-email">邮箱</label>
          <input v-model="email" type="email" id="login-email" placeholder="请输入您的邮箱" required>
        </div>
        <div class="input-group">
          <label for="login-password">密码</label>
          <input v-model="password" type="password" id="login-password" placeholder="请输入您的密码" required>
        </div>
        <div class="form-actions">
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>
        <button type="submit" class="btn-submit">登 录</button>
      </form>

      <!-- 注册表单 -->
      <form v-else class="auth-form" @submit.prevent="handleRegister">
        <h2>加入我们</h2>
        <div class="input-group">
          <label for="reg-email">邮箱</label>
          <input v-model="email" type="email" id="reg-email" placeholder="请输入您的邮箱" required>
        </div>
        <div class="input-group">
          <label for="reg-password">密码</label>
          <input v-model="password" type="password" id="reg-password" placeholder="创建一个密码" required>
        </div>
        <button type="submit" class="btn-submit">注 册</button>
      </form>
      
      <div class="social-login">
        <p>或通过以下方式登录</p>
        <div class="social-icons">
          <a href="#" class="social-icon"><i class="fab fa-weixin"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-qq"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-weibo"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../api/supabase';

const isLogin = ref(true);
const email = ref('');
const password = ref('');

async function handleLogin() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    alert('登录成功！');
    // 登录成功后可以进行页面跳转
    // import { useRouter } from 'vue-router';
    // const router = useRouter();
    // router.push('/'); 
  } catch (error) {
    alert(`登录失败: ${error.message}`);
  }
}

async function handleRegister() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    alert('注册成功！请检查您的邮箱以完成验证。');
  } catch (error) {
    alert(`注册失败: ${error.message}`);
  }
}
</script>