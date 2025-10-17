<template>
  <div class="poem-detail-container" v-if="poem">
    <h1 class="poem-title">{{ poem.title }}</h1>
    <p class="poem-meta">{{ poem.author }} · {{ poem.dynasty }}</p>
    <div class="poem-content">
      <p v-for="(line, index) in poem.content.split('。')" :key="index">{{ line }}</p>
    </div>
  </div>
  <div v-else>
    <p>正在加载诗词...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../api/supabase';

const route = useRoute();
const poem = ref(null);

const getPoem = async () => {
  const { data, error } = await supabase
    .from('poems')
    .select()
    .eq('title', route.params.title); // 移除 .single()

  if (error) {
    console.error('Error fetching poem:', error.message || error);
  } else {
    if (data && Array.isArray(data) && data.length > 0) {
      poem.value = data[0]; // 如果返回数组，取第一个元素
    } else if (data && !Array.isArray(data)) { // 如果返回单个对象
      poem.value = data;
    } else {
      poem.value = null; // 未找到诗词或数据为空
      console.warn('No poem found with title:', route.params.title);
    }
  }
};

onMounted(() => {
  console.log('PoemDetail component mounted.');
  console.log('Route params:', route.params);
  console.log('Poem title from route:', route.params.title);
  getPoem();
});
</script>

<style scoped>
.poem-detail-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.poem-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 10px;
}
.poem-meta {
  font-size: 1.1rem;
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}
.poem-content {
  font-size: 1.2rem;
  line-height: 2.2;
  text-align: center;
}
</style>