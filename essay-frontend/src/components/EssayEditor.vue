<template>
  <div class="container">
    <!-- 操作栏 -->
    <div class="action-bar">
      <div class="center-group">
        <span class="info-bar">当前字数：{{ essayContent.length }}字</span>
        <button @click="clear" class="clear-btn">🗑️ 清空内容</button>
        <button 
          @click="analyze" 
          :disabled="isAnalyzing || !essayContent.trim()"
          class="analyze-btn"
        >
          {{ isAnalyzing ? '分析中...' : '开始分析' }}
        </button>
      </div>
    </div>

    <!-- 输入区域 -->
    <textarea
      v-model="essayContent" 
      placeholder="在这里写下你的作文..."
      class="editor"
    ></textarea>

    <!-- 结果展示 -->
    <div v-if="result" class="result">
  <h3>分析结果</h3>
  <p>情感倾向：{{ result.sentiment }}</p>
  <h4>优化建议：</h4>
    <p v-for="(suggestion, index) in result.suggestions" :key="index">
      {{ index + 1 }}. {{ suggestion }}
    </p>
</div>


    <!-- 历史记录 -->
    <div class="history">
      <h3>历史记录（{{ history.length }}篇）</h3>
      <div 
      v-for="item in history" 
        :key="item._id"
        class="history-item"
      >
      <span>{{ formatDate(item.createdAt) }}</span>
        <span :class="item.sentiment">{{ item.sentiment }}</span>
        <button @click="deleteEssay(item._id)">删除</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

interface Essay {
  _id: string
  content: string
  sentiment: string
  suggestions: string[]
  createdAt: string
}

export default defineComponent({
  data() {
    return {
      history: [] as Essay[],
      essayContent: '',
      isAnalyzing: false,
      result: null as { sentiment: string, suggestions: string[] } | null
    }
  },
  methods: {
    async analyze() {
      if (!this.essayContent.trim()) {
        alert('请先输入作文内容')
        return
      }

      this.isAnalyzing = true
      this.result = null

      try {
        const response = await axios.post('http://localhost:3000/api/essays', {
          content: this.essayContent
        })
        
        this.result = {
          sentiment: response.data.sentiment,
          suggestions: response.data.suggestions
        }
        this.loadHistory()
      } catch (err) {
        alert('分析失败')
      } finally {
        this.isAnalyzing = false
      }
    },
    
    async loadHistory() {
      const response = await axios.get('http://localhost:3000/api/essays')
      this.history = response.data
    },
    // 在methods中添加
async deleteEssay(id: string) {
  if (!confirm('确定删除这篇作文？')) return
  
  try {
    await axios.delete(`http://localhost:3000/api/essays/${id}`)
    await this.loadHistory()
  } catch (err) {
    alert('删除失败')
  }
},

    clear() {
      this.essayContent = ''
      this.result = null
    },

    formatDate(isoString: string) {
      return new Date(isoString).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  mounted() {
    this.loadHistory()
  }
})
</script>



<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.action-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.center-group {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 20px;
  background: #f8f9fa;
  border-radius: 30px;
}

.info-bar {
  color: #666;
  font-size: 14px;
}

.editor {
  width: 100%;
  height: 300px;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  margin-bottom: 20px;
}

button {
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.clear-btn {
  background: #ff6b6b;
  color: white;
}

.analyze-btn {
  background: #4CAF50;
  color: white;
}

.analyze-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.result {
  margin-top: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.history {
  margin-top: 30px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 5px 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.积极 { color: #4CAF50; }
.消极 { color: #f44336; }
</style>
