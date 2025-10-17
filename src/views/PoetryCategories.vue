<template>
  <div class="container main-content">
    <section>
      <h2 class="section-title">诗词分类</h2>
      
      <!-- 筛选区域 -->
      <div class="filters">
        <div class="filter-group">
          <label for="dynasty-select">朝代：</label>
          <select id="dynasty-select" v-model="selectedDynasty" @change="fetchPoems">
            <option value="">所有朝代</option>
            <option v-for="dynasty in dynasties" :key="dynasty">{{ dynasty }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="tag2-select">分类：</label>
          <select id="tag2-select" v-model="selectedTag2" @change="fetchPoems">
            <option value="">所有分类</option>
            <option v-for="tag2 in tag2s" :key="tag2">{{ tag2 }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="author-search">作者：</label>
          <input type="text" id="author-search" v-model="selectedAuthor" @input="fetchPoems" placeholder="所有作者">
        </div>
      </div>

      <!-- 诗词列表 -->
      <div class="poetry-library">
        <div class="poem-card" v-for="poem in poems" :key="poem.id">
          <h3 class="poem-title">
            <router-link :to="{ name: 'PoemDetail', params: { id: poem.id }}">{{ poem.title }}</router-link>
          </h3>
          <p class="poem-author">{{ poem.author }} [{{ poem.dynasty }}]</p>
        </div>
      </div>

      <!-- 分页控制 -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '../api/supabase';

const poems = ref([]);
const dynasties = ref(['唐', '宋', '元', '明', '清']); // 硬编码朝代
const tag2s = ref(['七言律诗', '五言律诗', '五言排律', '古风', '句', '词', '乐府曲辞', '五言绝句', '七言绝句', '四言诗']); // 硬编码分类
const selectedDynasty = ref('');
const selectedTag2 = ref('');
const selectedAuthor = ref(''); // 新增作者搜索
const currentPage = ref(1);
const itemsPerPage = ref(6);
const totalPoems = ref(0);
const totalPages = ref(1);

const fetchPoems = async () => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value - 1;

  let query = supabase.from('poems').select('*', { count: 'exact' });

  if (selectedDynasty.value) {
    query = query.eq('dynasty', selectedDynasty.value);
  }
  if (selectedTag2.value) {
    query = query.eq('tag2', selectedTag2.value);
  }
  if (selectedAuthor.value) { // 添加作者筛选
    query = query.ilike('author', `%${selectedAuthor.value}%`);
  }

  const { data, count, error } = await query
    .order('id', { ascending: true })
    .range(start, end);

  if (error) {
    console.error('Error fetching poems:', error.message);
  } else {
    poems.value = data;
    totalPoems.value = count;
    totalPages.value = Math.ceil(totalPoems.value / itemsPerPage.value);
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
  // fetchFilters(); // 不再需要动态获取分类
  fetchPoems();
});

watch([currentPage, selectedDynasty, selectedTag2, selectedAuthor], () => { // 监听所有筛选条件
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
/* PoetryCategories.vue 特有样式 */
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filters label {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: bold;
}

.filters select, .filters input[type="text"] { /* 统一 input 样式 */
  padding: 8px 12px;
  border: 1px solid #d9d0c1;
  border-radius: 5px;
  background-color: white;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease;
}

.filters select:hover, .filters input[type="text"]:hover {
  border-color: #8b7355;
}

.filters select:focus, .filters input[type="text"]:focus {
  border-color: #8b7355;
  box-shadow: 0 0 0 2px rgba(139, 115, 85, 0.2);
}

.poetry-library {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px;
}

.poem-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(220, 210, 190, 0.5);
}

.poem-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.12);
}

.poem-title {
  font-family: "Noto Serif SC", "SimSun", serif;
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.poem-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.poem-title a:hover {
  color: #4a6fa5;
}

.poem-author {
  font-size: 0.95rem;
  color: #7f8c8d;
  font-style: italic;
}

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
</style>