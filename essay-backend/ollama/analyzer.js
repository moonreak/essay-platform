const axios = require('axios')
require('dotenv').config()

class OllamaAnalyzer {
  static async analyze(text) {
    try {
      const response = await axios.post(`${process.env.OLLAMA_API}/generate`, {
        model: 'qwen:7b',
        prompt: `[情感分析] 请用1个词（积极/中性/消极）评价以下文本情感：\n${text}`,
        stream: false,
        options: { temperature: 0.3 }
      })
      return response.data.response.trim()
    } catch (error) {
      console.error('Ollama分析失败:', error.message)
      return '中性' // 降级处理
    }
  }
}

module.exports = OllamaAnalyzer
