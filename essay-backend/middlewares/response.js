const standardResponse = (req, res, next) => {
    res.success = (data, message = 'success') => {
      res.json({
        code: 200,
        message,
        data
      })
    }
  
    res.error = (message, code = 400) => {
      res.status(code).json({
        code,
        message
      })
    }
  
    next()
  }
  
  module.exports = standardResponse
  