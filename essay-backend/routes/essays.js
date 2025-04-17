const express = require('express')
const router = express.Router()

// 获取历史记录
router.get('/', async (req, res) => {
  try {
    const essays = await Essay.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean() // 转换为纯JS对象
      .select('-__v') // 排除版本字段

    res.success(essays)
  } catch (error) {
    console.error('获取历史记录失败:', error)
    res.error('服务器内部错误', 500)
  }
})

// 提交作文
router.post('/', async (req, res) => {
  try {
    const { content } = req.body
    
    if (!content || content.trim().length < 10) {
      return res.error('作文内容不能少于10个字')
    }

    const newEssay = await Essay.create({ 
      content,
      sentiment: '中性' // 默认值
    })

    res.success({
      _id: newEssay._id,
      content: newEssay.content,
      sentiment: newEssay.sentiment,
      suggestions: newEssay.suggestions,
      createdAt: newEssay.createdAt
    }, '提交成功')
  } catch (error) {
    console.error('提交失败:', error)
    res.error('提交失败，请稍后重试', 500)
  }
})

// 删除作文
router.delete('/:id', async (req, res) => {
  try {
    const essay = await Essay.findByIdAndDelete(req.params.id)
    
    if (!essay) {
      return res.error('作文不存在')
    }

    res.success(null, '删除成功')
  } catch (error) {
    console.error('删除失败:', error)
    res.error('删除操作失败', 500)
  }
})

module.exports = router
