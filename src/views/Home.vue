<template>
  <div>
    <!-- 精选诗词推荐 -->
    <section>
        <h2 class="section-title">精选诗词推荐</h2>
        <div class="poem-grid">
            <template v-if="isLoading || featuredPoems.length === 0">
                <div v-for="n in 6" :key="n" class="poem-card skeleton-card">
                    <div class="poem-image skeleton-image"></div>
                    <div class="poem-excerpt-in-image skeleton-text"></div>
                    <div class="poem-title-in-image skeleton-text short"></div>
                </div>
            </template>
            <template v-else>
                <router-link 
                    v-for="(poem, index) in featuredPoems" 
                    :key="poem.title" 
                    :to="{ name: 'PoemDetail', params: { title: poem.title } }" 
                    class="poem-card"
                >
                    <div :class="['poem-image', `poem-image-${(index % 6) + 1}`]">
                        <p class="poem-excerpt-in-image">{{ poem.content.split('。')[0] }}...</p>
                        <div class="poem-title-in-image">{{ poem.title }}</div>
                    </div>
                </router-link>
            </template>
        </div>
    </section>
    
    <!-- 诗词分类 -->
    <section>
        <h2 class="section-title">诗词分类</h2>
        <div class="category-grid">
            <div class="category-item">
                <div class="category-icon">诗</div>
                <div>唐诗</div>
            </div>
            <div class="category-item">
                <div class="category-icon">词</div>
                <div>宋词</div>
            </div>
            <div class="category-item">
                <div class="category-icon">曲</div>
                <div>元曲</div>
            </div>
            <div class="category-item">
                <div class="category-icon">赋</div>
                <div>汉赋</div>
            </div>
            <div class="category-item">
                <div class="category-icon">经</div>
                <div>诗经</div>
            </div>
            <div class="category-item">
                <div class="category-icon">文</div>
                <div>古文</div>
            </div>
        </div>
    </section>
    
    <!-- 最新赏析文章 -->
    <section>
        <h2 class="section-title">最新赏析文章</h2>
        <div class="article-list">
            <div class="article-item">
                <h3 class="article-title">李白《登鹳雀楼》的艺术特色</h3>
                <div class="article-meta">作者：王明 | 发布时间：2023-10-15</div>
                <p class="article-summary">本文从意象、语言、意境三个方面分析了李白《登鹳雀楼》的艺术特色，探讨了诗人如何通过简练的语言创造出壮阔的意境...</p>
            </div>
            <div class="article-item">
                <h3 class="article-title">苏轼《水调歌头》的情感表达</h3>
                <div class="article-meta">作者：李华 | 发布时间：2023-10-12</div>
                <p class="article-summary">本文重点分析了苏轼《水调歌头》中蕴含的复杂情感，包括对亲人的思念、对人生的思考以及对自然的热爱...</p>
            </div>
            <div class="article-item">
                <h3 class="article-title">"描金花"与"鹧鸪"词牌比较研究</h3>
                <div class="article-meta">作者：张伟 | 发布时间：2023-10-08</div>
                <p class="article-summary">本文比较了"描金花"与"鹧鸪"两种词牌在格律、情感表达和艺术特色上的异同，探讨了它们各自的艺术价值...</p>
            </div>
        </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../api/supabase'; // 引入 supabase 客户端

const featuredPoems = ref([]); // 存储精选诗词
const isLoading = ref(true); // 添加加载状态

const fetchAndShufflePoems = async () => {
  isLoading.value = true; // 开始加载
  try {
    const { data, error } = await supabase
      .from('poems')
      .select('title, content'); // 只选择需要的字段

    if (error) {
      console.error('Error fetching poems for home page:', error.message || error);
    } else if (data) {
      // 随机打乱数组
      const shuffled = data.sort(() => 0.5 - Math.random());
      // 选取前6个作为精选诗词
      featuredPoems.value = shuffled.slice(0, 6);
    }
  } finally {
    isLoading.value = false; // 结束加载
  }
};

onMounted(() => {
  fetchAndShufflePoems(); // 组件挂载时获取并随机展示诗词

  // 卡片悬停效果增强
  const cards = document.querySelectorAll('.poem-card, .category-item');
  cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
      });
  });
});
</script>

<style scoped>
/* Home.vue 特有样式（如果有），但全局样式已在 src/assets/style.css 中定义 */

/* 骨架屏样式 */
.skeleton-card {
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.skeleton-image {
  width: 100%;
  padding-top: 60%; /* 保持图片比例 */
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-text {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  height: 1em;
  margin: 0.5em 1em;
  border-radius: 4px;
}

.skeleton-text.short {
  width: 60%;
  margin: 0.5em auto 1em; /* 居中 */
}

@keyframes loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>