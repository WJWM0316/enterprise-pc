/**
 * 通用验证规则
 */

// 价格验证
export const priceRules = {
  min: 0.01,
  max: 10000,
  pattern: /^(([0-9]{1,4})|10000)(\.[0-9]{1,2})?$/
}

// 编辑器内容
export const editorRules = {
  validator: (rule, value, callback) => {
    if (!value || value === '<p><br></p>') {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  }
}

// 排序验证
export const sortRules = {
  validator: (rule, value, callback) => {
    if (value) {
      const sort = Number(value)
      if ((!sort && sort !== 0) || sort < 0 || sort > 9998 || sort.toString().indexOf('.') >= 0) {
        return callback(new Error('排序只能是0到9998的正整数'))
      }
    }
    callback()
  }
}

// 时间范围选择
export const timeRangeRules = {
  validator: (rule, value, callback) => {
    if (!value || value.length !== 2) {
      return callback(new Error('请填写生效时间'))
    }

    const start = value[0] && value[0] instanceof Date ? value[0] : new Date(value[0])
    const end = value[1] && value[1] instanceof Date ? value[1] : new Date(value[1])

    if (start.getTime() > end.getTime()) {
      return callback(new Error('结束时间不能早于开始时间'))
    }

    return callback()
  }
}
