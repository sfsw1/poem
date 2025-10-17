<template>
  <div class="container main-content">
    <section>
      <h2 class="section-title">{{ isLoginMode ? '用户登录' : '用户注册' }}</h2>
      <div class="auth-form">
        <form @submit.prevent="isLoginMode ? login() : register()">
          <!-- 注册模式下的用户名 -->
          <div class="form-group" v-if="!isLoginMode">
            <label for="username">用户名:</label>
            <input type="text" id="username" v-model="username" required>
          </div>

          <!-- 邮箱 -->
          <div class="form-group">
            <label for="email">邮箱:</label>
            <input type="email" id="email" v-model="email" required>
          </div>

          <!-- 密码 -->
          <div class="form-group">
            <label for="password">密码:</label>
            <input type="password" id="password" v-model="password" required>
          </div>

          <!-- 消息显示 -->
          <p v-if="message" :class="{'success-message': !error, 'error-message': error}">{{ message }}</p>

          <!-- 提交按钮 -->
          <button type="submit" class="submit-btn">{{ isLoginMode ? '登录' : '注册' }}</button>
        </form>

        <!-- 切换模式按钮 -->
        <button @click="toggleMode" class="toggle-mode-btn">
          {{ isLoginMode ? '没有账号？去注册' : '已有账号？去登录' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../api/supabase';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoginMode = ref(true); // true for login, false for register
const email = ref('');
const password = ref('');
const username = ref('');
const message = ref('');
const error = ref(false);

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  // Reset form fields and messages when toggling mode
  email.value = '';
  password.value = '';
  username.value = '';
  message.value = '';
  error.value = false;
};

const register = async () => {
  message.value = '';
  error.value = false;
  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
        },
      },
    });

    if (signUpError) throw signUpError;

    message.value = '注册成功！请检查您的邮箱进行验证。'; // Supabase 默认需要邮箱验证
    router.push('/'); // 注册成功后跳转到首页
  } catch (err) {
    error.value = true;
    message.value = `注册失败: ${err.message}`;
    console.error('Error during registration:', err);
  }
};

const login = async () => {
  message.value = '';
  error.value = false;
  try {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (loginError) throw loginError;
    message.value = '登录成功！';
    router.push('/'); // 登录成功后跳转到首页
  } catch (err) {
    error.value = true;
    message.value = `登录失败: ${err.message}`;
    console.error('Error during login:', err);
    console.error('Supabase login error details:', err); // 添加更详细的错误日志
  }
};
</script>

<style scoped>
/* LoginRegister.vue 特有样式 */
.auth-form {
  max-width: 450px;
  margin: 40px auto;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(220, 210, 190, 0.5);
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d0c1;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  border-color: #8b7355;
  box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.2);
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background-color: #8b7355;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #a08060;
  transform: translateY(-2px);
}

.toggle-mode-btn {
  background: none;
  border: none;
  color: #4a6fa5;
  font-size: 1rem;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.toggle-mode-btn:hover {
  color: #3a5a85;
}

.success-message {
  color: green;
  margin-bottom: 15px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>