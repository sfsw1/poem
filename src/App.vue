<template>
  <!-- 飘落的花瓣 -->
  <div class="petal" style="left: 10%; animation-duration: 15s; animation-delay: 0s;"></div>
  <div class="petal" style="left: 20%; animation-duration: 20s; animation-delay: 2s;"></div>
  <div class="petal" style="left: 50%; animation-duration: 18s; animation-delay: 5s;"></div>
  <div class="petal" style="left: 70%; animation-duration: 25s; animation-delay: 8s;"></div>
  <div class="petal" style="left: 90%; animation-duration: 22s; animation-delay: 12s;"></div>
  
  <!-- 页边卷轴装饰 -->
  <div class="scroll-decoration left"></div>
  <div class="scroll-decoration right"></div>
  
  <!-- 顶部导航 -->
  <header>
      <div class="container">
          <div class="top-decoration"></div>
          <h1 class="site-title">蓝韵诗语</h1>
          <nav>
              <ul>
                  <li><router-link to="/">首页</router-link></li>
                  <li><router-link to="/poetry-library">诗词精选</router-link></li>
                  <li><router-link to="/poetry-categories">诗词分类</router-link></li>
                  <li><a href="#">赏析文章</a></li> <!-- Placeholder for now -->
                  <li><router-link to="/about">关于我们</router-link></li>
                  <li v-if="user"><router-link to="/my">我的</router-link></li>
              </ul>
          </nav>
          <div class="auth-section">
            <template v-if="user">
              <span class="user-greeting">欢迎, {{ user.user_metadata.username || user.email }}</span>
              <button @click="logout" class="logout-btn">退出登录</button>
            </template>
            <template v-else>
              <router-link to="/login-register" class="login-register-btn">登录/注册</router-link>
            </template>
          </div>
      </div>
  </header>

  <!-- 主要内容区，由 router-view 渲染具体页面内容 -->
  <main class="container main-content">
    <router-view/>
  </main>

  <!-- AI 聊天助手浮动按钮 -->
  <button class="chatbot-toggle-button" @click="toggleChatbot">
    <img src="/chatbot-icon.png" alt="AI Chatbot" v-if="!showChatbot" />
    <span v-else>X</span>
  </button>

  <!-- AI 聊天助手组件 -->
  <Chatbot v-if="showChatbot" class="floating-chatbot" />

  <!-- 底部信息 -->
  <footer>
      <div class="container">
          <div class="footer-content">
              <div class="footer-section">
                  <h3>关于网站</h3>
                  <p>蓝韵诗语是一个致力于传播中华古典诗词文化的网站，收录了大量经典诗词作品和赏析文章。</p>
              </div>
              <div class="footer-section">
                  <h3>快捷链接</h3>
                  <ul>
                      <li><router-link to="/">网站首页</router-link></li>
                      <li><router-link to="/poetry-library">诗词大全</router-link></li>
                      <li><a href="#">诗人介绍</a></li>
                      <li><a href="#">诗词鉴赏</a></li>
                  </ul>
              </div>
              <div class="footer-section">
                  <h3>联系我们</h3>
                  <ul>
                      <li>邮箱：contact@lanyunshiyu.com</li>
                      <li>电话：010-12345678</li>
                      <li>地址：北京市海淀区中关村大街1号</li>
                  </ul>
              </div>
              <div class="footer-section">
                  <h3>关注我们</h3>
                  <ul>
                      <li><a href="#">微信公众号</a></li>
                      <li><a href="#">微博</a></li>
                      <li><a href="#">知乎专栏</a></li>
                  </ul>
              </div>
          </div>
          <div class="copyright">
              <p>© 2023 蓝韵诗语 版权所有 | 京ICP备12345678号</p>
          </div>
      </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from './api/supabase'; // 引入 supabase 客户端
import { useRouter } from 'vue-router';
import Chatbot from './views/Chatbot.vue'; // 导入 Chatbot 组件

const user = ref(null);
const router = useRouter();
const showChatbot = ref(false); // 控制聊天助手显示/隐藏的状态

const toggleChatbot = () => {
  showChatbot.value = !showChatbot.value;
};

onMounted(async () => {
  // 获取初始用户会话
  const { data: { user: currentUser } } = await supabase.auth.getUser();
  user.value = currentUser;

  // 监听认证状态变化
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null;
    if (!user.value && event === 'SIGNED_OUT') {
      // 如果用户退出，并且当前不在登录注册页，则跳转到首页
      if (router.currentRoute.value.path !== '/login-register') {
        router.push('/');
      }
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

<style>
/* App.vue 特有样式（如果有），但全局样式已在 src/assets/style.css 中定义 */
.auth-section {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-greeting {
  color: #8b7355;
  font-size: 1.1rem;
  font-weight: bold;
}

.login-register-btn, .logout-btn {
  background-color: #8b7355;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.login-register-btn:hover, .logout-btn:hover {
  background-color: #a08060;
}

/* 聊天助手浮动按钮样式 */
.chatbot-toggle-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #8b7355;
  color: white;
  font-size: 1.5rem;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保在最上层 */
  transition: background-color 0.3s ease;
}

.chatbot-toggle-button:hover {
  background-color: #a08060;
}

.chatbot-toggle-button img {
  width: 30px;
  height: 30px;
}

/* 浮动聊天助手组件样式 */
.floating-chatbot {
  position: fixed;
  bottom: 100px; /* 调整位置，避免与按钮重叠 */
  right: 30px;
  width: 380px; /* 聊天窗口宽度 */
  height: 500px; /* 聊天窗口高度 */
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 999; /* 略低于按钮 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 确保内容不溢出 */
}
</style>