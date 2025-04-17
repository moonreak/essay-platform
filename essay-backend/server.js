const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// 连接MongoDB（无需密码）
mongoose.connect('mongodb://localhost:27017/essay_db')

function randomSentiment() {
  const rand = Math.random()
  return rand < 0.6 ? '积极' 
    : rand < 0.9 ? '中性' 
    : '消极'
}

function randomSuggestions() {
  const suggestionsPool = [
    '建议增加修辞手法',
    '可优化段落结构',
    '注意标点使用',
    '适当增加细节描写',
    '尝试使用高级词汇',
    '减少重复用词'
  ]
  
  // 随机选3条不重复建议
  return [...new Set(suggestionsPool)]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
}
// 定义作文模型

const Essay = require('./models/Essay') 

// 中间件
app.use(express.json())
app.use(cors())                                                                                                                                 *
+


// 提交作文
app.post('/api/essays', async (req, res) => {
  // 添加基础校验（防止空内容提交）
  if (!req.body.content?.trim()) { //  
    return res.status(400).json({ error: '作文内容不能为空' })
  }
  try {
    const essay = await Essay.create({
      content: req.body.content,
      sentiment: randomSentiment(), //  调用随机函数
      suggestions: randomSuggestions() //  生成随机建议
    })
    res.json(essay)
  } catch (err) {
    console.error('提交错误:', err) //  添加错误日志
    res.status(500).json({ error: '提交失败' })
  }
})

// 获取历史
app.get('/api/essays', async (req, res) => {
  try {
    const essays = await Essay.find()
      .sort({ createdAt: -1 })
      .limit(20) //  防止数据量过大
    res.json(essays)
  } catch (err) {
    console.error('获取历史失败:', err)
    res.status(500).json({ error: '获取失败' })
  }
})

app.delete('/api/essays/:id', async (req, res) => {
  try {
    await Essay.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: '删除失败' })
  }
})
// 启动服务
app.listen(3000, () => {
  console.log('后端运行在 http://localhost:3000')
})


