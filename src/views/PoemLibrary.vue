<template>
  <div class="poem-library-container p-8">
    <h1 class="text-3xl font-bold mb-6">诗词库</h1>
    <div class="poem-grid">
      <div v-for="poem in poems" :key="poem.id" class="poem-card-lib">
        <router-link :to="{ name: 'PoemDetail', params: { id: poem.id } }">
          <h3 class="text-lg font-semibold">{{ poem.title }}</h3>
          <p class="text-gray-600">{{ poem.author }} [{{ poem.dynasty }}]</p>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../api/supabase';

const poems = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPoems = ref(0);

const totalPages = computed(() => Math.ceil(totalPoems.value / itemsPerPage.value));

const fetchPoems = async () => {
  const from = (currentPage.value - 1) * itemsPerPage.value;
  const to = from + itemsPerPage.value - 1;

  const { count, error: countError } = await supabase
    .from('poems')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error fetching poem count:', countError.message);
    return;
  }
  totalPoems.value = count || 0;

  const { data, error } = await supabase
    .from('poems')
    .select('*')
    .order('id')
    .range(from, to);

  if (error) {
    console.error('Error fetching poems:', error.message);
  } else {
    poems.value = data;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPoems();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchPoems();
  }
};

onMounted(() => {
  fetchPoems();
});
</script>

<style scoped>
.poem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
.poem-card-lib {
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
  transition: box-shadow 0.3s;
}
.poem-card-lib:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>