const axios = require('axios');

class OllamaService {
  static async analyzeSentiment(text) {
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'qwen:7b',
        prompt: `[情感分析任务] 请用单个词（积极/中性/消极）评价以下文本情感：${text}`,
        stream: false,
        options: { temperature: 0.1 } // 降低随机性
      });
      return response.data.response.trim();
    } catch (error) {
      console.error('Ollama调用失败:', error.message);
      return 'neutral'; // 降级处理
    }
  }
}

module.exports = OllamaService;
