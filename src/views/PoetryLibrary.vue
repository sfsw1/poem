<template>
  <div class="container main-content">
    <section>
        <h2 class="section-title">诗词库</h2>
        <div class="poetry-library">
            <template v-if="isLoading">
                <div v-for="n in itemsPerPage" :key="n" class="poem-card skeleton-card">
                    <div class="skeleton-text long"></div>
                    <div class="skeleton-text short"></div>
                </div>
            </template>
            <template v-else>
                <div class="poem-card" v-for="poem in poems" :key="poem.id">
                    <h3 class="poem-title">
                        <router-link :to="{ name: 'PoemDetail', params: { title: poem.title }}">{{ poem.title }}</router-link>
                    </h3>
                    <p class="poem-author">{{ poem.author }} [{{ poem.dynasty }}]</p>
                </div>
            </template>
        </div>
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1 || isLoading">上一页</button>
            <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
            <button @click="nextPage" :disabled="currentPage === totalPages || isLoading">下一页</button>
        </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '../api/supabase'; // 导入 supabase 客户端

const poems = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(6); // 每页显示 6 首诗词
const totalPoems = ref(0);
const totalPages = ref(1);
const isLoading = ref(true); // 添加加载状态

const fetchPoems = async () => {
  isLoading.value = true; // 开始加载
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value - 1;

  try {
    const { data, count, error } = await supabase
      .from('poems') // 假设你的诗词表名为 'poems'
      .select('id, title, author, dynasty', { count: 'exact' }) // 只选择必要的字段
      .order('id', { ascending: true }) // 假设按 id 排序
      .range(start, end);

    if (error) {
      console.error('Error fetching poems:', error.message);
      poems.value = []; // 清空数据
    } else {
      poems.value = data;
      totalPoems.value = count;
      totalPages.value = Math.ceil(totalPoems.value / itemsPerPage.value);
    }
  } finally {
    isLoading.value = false; // 结束加载
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(() => {
  fetchPoems();
});

// 监听 currentPage 变化，重新获取数据
watch(currentPage, () => {
  fetchPoems();
});

// 卡片悬停效果增强
onMounted(() => {
  const cards = document.querySelectorAll('.poem-card');
  cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-6px)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
      });
  });
});
</script>

<style scoped>
/* PoetryLibrary.vue 特有样式，如果需要覆盖全局样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}

.pagination button {
  background-color: #8b7355;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #a08060;
}

.pagination span {
  font-size: 1.1rem;
  color: #555;
}

/* 骨架屏样式 */
.skeleton-card {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.skeleton-text {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  height: 1em;
  margin: 0.5em 0;
  border-radius: 4px;
  width: 80%;
}

.skeleton-text.long {
  width: 90%;
}

.skeleton-text.short {
  width: 50%;
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