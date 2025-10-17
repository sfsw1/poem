<template>
  <div>
    <!-- 精选诗词推荐 -->
    <section>
        <h2 class="section-title">精选诗词推荐</h2>
        <div class="poem-grid">
            <div class="poem-card">
                <div class="poem-image poem-image-1">
                    <p class="poem-excerpt-in-image">君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪...</p>
                    <div class="poem-title-in-image">将进酒</div>
                </div>
            </div>
            
            <div class="poem-card">
                <div class="poem-image poem-image-2">
                    <p class="poem-excerpt-in-image">明月几时有？把酒问青天。不知天上宫阙，今夕是何年...</p>
                    <div class="poem-title-in-image">水调歌头</div>
                </div>
            </div>
            
            <div class="poem-card">
                <div class="poem-image poem-image-3">
                    <p class="poem-excerpt-in-image">床前明月光，疑是地上霜。举头望明月，低头思故乡...</p>
                    <div class="poem-title-in-image">静夜思</div>
                </div>
            </div>
            
            <div class="poem-card">
                <div class="poem-image poem-image-4">
                    <p class="poem-excerpt-in-image">桃李春风一杯酒，江湖夜雨十年灯...</p>
                    <div class="poem-title-in-image">桃李惊春</div>
                </div>
            </div>
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
import { onMounted } from 'vue';

onMounted(() => {
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
</style>