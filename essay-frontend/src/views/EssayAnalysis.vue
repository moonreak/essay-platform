<script setup lang="ts">
import { ref } from 'vue';

const essayContent = ref('');
const analysisResult = ref('');

const analyzeSentiment = async () => {
  const response = await fetch('http://localhost:3000/essay/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: essayContent.value })
  });
  const data = await response.json();
  analysisResult.value = `情感倾向: ${data.sentiment}`;
};
</script>

<template>
  <div>
    <textarea v-model="essayContent"></textarea>
    <button @click="analyzeSentiment">情感分析</button>
    <div v-if="analysisResult">{{ analysisResult }}</div>
  </div>
</template>
