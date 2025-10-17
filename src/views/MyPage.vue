<template>
  <div class="container main-content">
    <section>
      <h2 class="section-title">我的页面</h2>
      <div v-if="user" class="user-info">
        <p><strong>用户名:</strong> {{ user.user_metadata.username || '未设置' }}</p>
        <p><strong>邮箱:</strong> {{ user.email }}</p>
        <button @click="logout" class="logout-btn">退出登录</button>
      </div>
      <div v-else>
        <p>您尚未登录，请先<router-link to="/login-register">登录/注册</router-link>。</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../api/supabase';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

onMounted(async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser();
  user.value = currentUser;

  // 监听认证状态变化
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null;
    if (!user.value && event === 'SIGNED_OUT') {
      router.push('/login-register'); // 如果用户退出，跳转到登录注册页
    }
  });
});

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error logging out:', error.message);
  } else {
    router.push('/'); // 退出成功后跳转到首页
  }
};
</script>

<style scoped>
/* MyPage.vue 特有样式 */
.user-info {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(220, 210, 190, 0.5);
  max-width: 500px;
  margin: 40px auto;
  text-align: left;
}

.user-info p {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #333;
}

.user-info strong {
  color: #2c3e50;
}

.logout-btn {
  background-color: #d9534f;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;
}

.logout-btn:hover {
  background-color: #c9302c;
  transform: translateY(-2px);
}

.section-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 2.2rem;
  font-weight: bold;
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #8b7355;
  border-radius: 2px;
}
</style>