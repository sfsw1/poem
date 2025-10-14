<template>
  <!-- 顶部导航 -->
  <header>
    <div class="nav-container">
      <div class="logo">
        <i class="fas fa-book-open"></i>
        <h1>诗韵 · 古风诗词库</h1>
      </div>
      <nav>
        <a href="#"><i class="fas fa-home"></i> 首页</a>
        <a href="#"><i class="fas fa-th-large"></i> 诗词分类</a>
        <a href="#"><i class="fas fa-search"></i> 智能检索</a>
        <a href="#"><i class="fas fa-user"></i> 个人中心</a>
      </nav>
      <div class="nav-buttons">
        <button class="btn btn-login">登录 / 注册</button>
      </div>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="hero">
    <div class="hero-content">
      <h2>探索千年诗词之美</h2>
      <p>收录唐诗宋词经典作品，提供权威赏析与智能检索功能，让传统文化触手可及。</p>
      <div class="hero-buttons">
        <button class="btn btn-primary">开始探索</button>
        <button class="btn btn-secondary">了解更多</button>
      </div>
    </div>
  </section>

  <!-- Search Bar -->
  <section class="search-section">
    <h2 class="search-title">发现心仪诗词</h2>
    <div class="search-container">
      <div class="search-box">
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
        <input type="text" class="search-input" placeholder="搜索诗词、作者或关键词...">
        <button class="search-btn">搜索</button>
      </div>
    </div>
  </section>

  <!-- Popular Poems -->
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">热门诗词</h2>
      <p class="section-subtitle">历代传颂的经典之作，感受古人的情感与智慧</p>
      <a href="#" class="view-all">查看更多</a>
    </div>
    <div class="poems-grid">
      <div v-for="(poem, index) in popularPoems" :key="index" class="poem-card">
        <img :src="poem.image" :alt="poem.title" class="poem-image">
        <div class="poem-content">
          <h3 class="poem-title">{{ poem.title }}</h3>
          <p class="poem-author">{{ poem.author }} · {{ poem.dynasty }}</p>
          <div class="poem-tags">
            <span class="tag">{{ poem.tag1 }}</span>
            <span class="tag">{{ poem.tag2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Theme Collections -->
  <section class="section" style="background: #f8f9fa;">
    <div class="section-header">
      <h2 class="section-title">主题精选</h2>
      <p class="section-subtitle">按主题精心挑选的诗词合集，带您领略不同情感与意境</p>
      <a href="#" class="view-all">查看更多</a>
    </div>
    <div class="themes-grid">
      <div v-for="(theme, index) in themes" :key="index" class="theme-card">
        <img :src="theme.image" :alt="theme.title" class="theme-image">
        <div class="theme-content">
          <h3 class="theme-title">{{ theme.title }}</h3>
          <p class="theme-desc">{{ theme.description }}</p>
          <div class="theme-meta">
            <span><i class="fas fa-poetry"></i> {{ theme.count }}首诗词</span>
            <span><i class="fas fa-heart"></i> {{ theme.likes }}人喜欢</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Latest Updates -->
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">最新更新</h2>
      <p class="section-subtitle">平台最新添加的诗词赏析与解读内容</p>
      <a href="#" class="view-all">查看全部</a>
    </div>
    <div class="updates-grid">
      <div v-for="(update, index) in updates" :key="index" class="update-card">
        <div class="update-header">
          <div class="update-date">{{ update.date }}</div>
          <h3 class="update-title">{{ update.title }}</h3>
        </div>
        <div class="update-content">
          <p class="update-desc">{{ update.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="footer-grid">
      <div class="footer-col">
        <h3>诗韵 · 古风诗词库</h3>
        <p style="color: #bdc3c7; margin-top: 20px; line-height: 1.7;">传承千年文化，探索诗词之美。我们致力于打造最全面的古诗词数据库，让古典文学焕发新生。</p>
      </div>
      <div class="footer-col">
        <h3>快速链接</h3>
        <ul class="footer-links">
          <li><a href="#"><i class="fas fa-chevron-right"></i> 首页</a></li>
          <li><a href="#"><i class="fas fa-chevron-right"></i> 诗词分类</a></li>
          <li><a href="#"><i class="fas fa-chevron-right"></i> 智能检索</a></li>
          <li><a href="#"><i class="fas fa-chevron-right"></i> 个人中心</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>关于我们</h3>
        <ul class="footer-links">
          <li><a href="#"><i class="fas fa-chevron-right"></i> 平台介绍</a></li>
          <li><a href="#"><i class="fas fa-chevron-right"></i> 合作联系</a></li>
          <li><a href="#"><i class="fas fa-chevron-right"></i> 版权声明</a></li>
          <li><a href="#"><i class="fas fa-chevron-right"></i> 加入我们</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>联系我们</h3>
        <div class="contact-info">
          <i class="fas fa-envelope"></i>
          <span>邮箱：contact@shiyun.com</span>
        </div>
        <div class="contact-info">
          <i class="fas fa-phone-alt"></i>
          <span>电话：010-12345678</span>
        </div>
        <div class="contact-info">
          <i class="fas fa-map-marker-alt"></i>
          <span>地址：北京市海淀区文化创意园</span>
        </div>
        <div class="contact-info">
          <i class="fas fa-fingerprint"></i>
          <span>备案号：京ICP备12345678号</span>
        </div>
      </div>
    </div>
    <div class="copyright">
      © 2025 诗韵 · 古风诗词库. 保留所有权利 | 设计制作：诗词文化传承团队
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const popularPoems = ref([
  {
    title: '静夜思',
    author: '李白',
    dynasty: '唐代',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000',
    tag1: '思乡',
    tag2: '五言绝句'
  },
  {
    title: '水调歌头',
    author: '苏轼',
    dynasty: '宋代',
    image: 'https://images.unsplash.com/photo-1506462945848-ac8ea6f60668?q=80&w=1000',
    tag1: '中秋',
    tag2: '豪放词'
  },
  {
    title: '春晓',
    author: '孟浩然',
    dynasty: '唐代',
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1000',
    tag1: '春天',
    tag2: '写景'
  },
  {
    title: '登鹳雀楼',
    author: '王之涣',
    dynasty: '唐代',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000',
    tag1: '登高',
    tag2: '哲理'
  },
  {
    title: '相思',
    author: '王维',
    dynasty: '唐代',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000',
    tag1: '爱情',
    tag2: '红豆'
  }
]);

const themes = ref([
  {
    title: '秋日诗词特辑',
    description: '精选描绘秋日风光与情感的诗词作品，感受落叶知秋的意境',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000',
    count: 42,
    likes: 1280
  },
  {
    title: '送别诗中的深情',
    description: '感受古人离别时的真挚情感与不舍，体会"劝君更尽一杯酒"的情怀',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000',
    count: 28,
    likes: 980
  },
  {
    title: '山水诗中的自然',
    description: '领略古人笔下的壮丽山河与自然风光，感受天人合一的境界',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
    count: 36,
    likes: 1520
  },
  {
    title: '咏史诗中的哲思',
    description: '通过历史事件反思人生与社会的智慧，汲取古人的经验与教训',
    image: 'https://images.unsplash.com/photo-1532117182044-ae0c7b7e6b78?q=80&w=1000',
    count: 24,
    likes: 870
  }
]);

const updates = ref([
  {
    title: '新增白居易诗赏析',
    description: '今日新增《琵琶行》《长恨歌》等三首白居易经典诗作的深度赏析，特别邀请古典文学专家进行解读，帮助读者理解作品背后的社会背景与作者情感。',
    date: '2025年4月5日'
  },
  {
    title: '宋词专题更新',
    description: '新增李清照《声声慢》与辛弃疾《青玉案》两首宋词的名家点评，包含词牌解析、创作背景及后世影响分析，带您深入理解婉约与豪放两种词风。',
    date: '2025年4月3日'
  },
  {
    title: '春日诗词特辑上线',
    description: '全新策划春日主题诗词合集，包含描写春景、春情、春愁的佳作50余首，配以古代绘画作品，让您感受古人眼中的春天。',
    date: '2025年4月1日'
  }
]);
</script>