export interface Essay {
    _id: string
    content: string
    sentiment: '积极' | '中性' | '消极'
    suggestions: string[]
    createdAt: string
  }
  
  // 精确匹配后端创建逻辑
  export type EssayCreateDTO = {
    content: string
    sentiment?: '积极' | '中性' | '消极' // 可选字段（后端有默认值）
  }
  