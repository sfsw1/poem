<template>
  <div class="chatbot-container">
    <h2 class="section-title">AI 聊天助手</h2>
    <div class="chat-window">
      <div v-for="(message, index) in messages" :key="index" :class="['chat-message', message.sender]">
        <div class="message-bubble">
          {{ message.text }}
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input 
        v-model="currentMessage" 
        @keyup.enter="sendMessage" 
        placeholder="输入你的消息..."
        :disabled="isLoading"
      />
      <button @click="sendMessage" :disabled="isLoading">
        {{ isLoading ? '发送中...' : '发送' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; // 假设你已经安装了 axios

const messages = ref([]);
const currentMessage = ref('');
const isLoading = ref(false);

// 替换为你的 n8n Webhook URL
const N8N_WEBHOOK_URL = 'https://grgergera.app.n8n.cloud/webhook/poetry-chat'; 

const sendMessage = async () => {
  if (currentMessage.value.trim() === '') return;

  const userMessage = currentMessage.value;
  messages.value.push({ sender: 'user', text: userMessage });
  currentMessage.value = '';
  isLoading.value = true;

  try {
    const response = await axios.post(N8N_WEBHOOK_URL, {
      message: userMessage
    });

    // 假设 n8n 返回的响应在 response.data.response 字段中
    messages.value.push({ sender: 'ai', text: response.data.output || '抱歉，我没有收到有效的回复。' });
  } catch (error) {
    console.error('Error sending message to n8n:', error);
    messages.value.push({ sender: 'ai', text: '抱歉，连接聊天助手时出现错误。' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.chatbot-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 70vh; /* 设定聊天窗口高度 */
}

.section-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.chat-window {
  flex-grow: 1;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  overflow-y: auto;
  margin-bottom: 15px;
  background-color: #f9f9f9;
}

.chat-message {
  display: flex;
  margin-bottom: 10px;
}

.chat-message.user {
  justify-content: flex-end;
}

.chat-message.ai {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  line-height: 1.5;
  word-wrap: break-word;
}

.chat-message.user .message-bubble {
  background-color: #8b7355;
  color: white;
  border-bottom-right-radius: 2px;
}

.chat-message.ai .message-bubble {
  background-color: #e0e0e0;
  color: #333;
  border-bottom-left-radius: 2px;
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
}

.chat-input button {
  background-color: #8b7355;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chat-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.chat-input button:hover:not(:disabled) {
  background-color: #a08060;
}
</style>